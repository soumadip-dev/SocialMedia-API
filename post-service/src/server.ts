import app from './app.js';
import { connectDB } from './config/db.config.js';
import { ENV } from './config/env.config.js';
import logger from './utils/logger.utils.js';
import { connectToRabbitMQ } from './utils/rabbitmq.utils';

const PORT = ENV.PORT;

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection ❌ at ${promise}, Reason: ${reason}`);
  process.exit(1);
});

const startServer = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Connect to RabbitMQ
    await connectToRabbitMQ();

    // Start the server
    const server = app.listen(PORT, () => {
      logger.info(`Post service running on http://localhost:${PORT} 🌐`);
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
  } catch (error) {
    logger.error('Application startup failed', { error });
    process.exit(1);
  }
};

startServer();
