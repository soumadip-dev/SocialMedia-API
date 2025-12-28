import winston, { Logger } from 'winston';
import { ENV } from '../config/env.config';

//* Create a logger instance using Winston
const logger: Logger = winston.createLogger({
  level: ENV.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-gateway' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: 'api-gateway-error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'api-gateway-combined.log',
    }),
  ],
});

export default logger;
