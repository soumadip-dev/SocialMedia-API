import app from './app.js';
import { ENV } from './config/env.config.js';
import logger from './utils/logger.utils.js';

const PORT = ENV.PORT;

// Start server
const server = app.listen(PORT, () => {
  logger.info(`API Gateway running on http://localhost:${PORT} 🌐`);
  logger.info(`Identity service is running on ${ENV.IDENTITY_SERVICE_URL} 🪪`);
  logger.info(`Post service is running on ${ENV.POST_SERVICE_URL} 📤`);
  logger.info(`Redis URl: ${ENV.REDIS_URL}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection ❌ at ${promise}, Reason: ${reason} `);
});

// Handle server errors
server.on('error', err => {
  if ('code' in err && err.code === 'EADDRINUSE') {
    logger.error(
      `Port ${PORT} is already in use. Please stop the running process or use a different port. ⚠️`
    );
  } else {
    logger.error('Failed to start server ❌', { error: err });
  }
  process.exit(1);
});
