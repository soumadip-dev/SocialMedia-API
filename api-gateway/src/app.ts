import type { Express, NextFunction, Request, Response } from 'express';
import type { MessageResponse } from './interfaces/message-response.js';

import express from 'express';
import helmet from 'helmet';
import Redis from 'ioredis';
import morgan from 'morgan';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import proxy from 'express-http-proxy';

import healthRoutes from './routes/health.routes.js';
import configureCors from './config/cors.config.js';
import { ENV } from './config/env.config.js';
import errorHandler from './middleware/error.middlewares.js';
import logger from './utils/logger.utils.js';
import { ErrorResponse } from './interfaces/error-response.js';
import { validateToken } from './middleware/auth.middleware.js';

const app: Express = express();

const redisClient = new Redis(ENV.REDIS_URL);

const ratelimit: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response<ErrorResponse>) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip} 🚫`);
    res.status(429).json({ message: 'Too many request', success: false });
  },
  store: new RedisStore({
    // @ts-expect-error
    sendCommand: (...args: string[]) => redisClient.call(...args),
  }),
});

// Global middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(configureCors());
app.use(express.json());
app.use(ratelimit);
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Received ${req.method} request to ${req.url} 📨`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

//* Home route
app.get('/', (req: Request, res: Response<MessageResponse>) => {
  res.status(200).json({
    message: 'Home route for API-GATEWAY is running 🏚️',
    success: true,
  });
});

const proxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, '/api');
  },
  proxyErrorHandler: (err: Error, res: Response<ErrorResponse>, next: NextFunction) => {
    logger.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      errors: [err.message],
    });
  },
};

//* Setting up proxy for identity service
app.use(
  '/v1/auth',
  proxy(ENV.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: proxyReqOpts => {
      proxyReqOpts.headers['Content-Type'] = 'application/json';
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(`Response received from Identity service : ${proxyRes.statusCode}`);

      return proxyResData;
    },
  })
);

//* Setting up proxy for post service
app.use(
  '/v1/post',
  validateToken,
  proxy(ENV.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['Content-Type'] = 'application/json';
      proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(`Response received from Post service : ${proxyRes.statusCode}`);

      return proxyResData;
    },
  })
);

//* Setting up proxy for media service
app.use(
  '/v1/media',
  validateToken,
  proxy(ENV.MEDIA_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
      if (
        srcReq.headers['content-type'] &&
        !srcReq.headers['content-type'].startsWith('multipart/form-data')
      ) {
        proxyReqOpts.headers['Content-Type'] = 'application/json';
      }
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(`Response received from Media service : ${proxyRes.statusCode}`);

      return proxyResData;
    },
    // @ts-ignore
    parseReqBody: false,
  })
);

//* Health check routes
app.use('/api/health', healthRoutes);

app.use(errorHandler);

export default app;
