import * as amqp from 'amqplib';
import type { Channel, ChannelModel } from 'amqplib';

import { ENV } from '../config/env.config';
import logger from './logger.utils';

// Holds the active connection instance to avoid reconnecting
let connection: ChannelModel | null = null;

// Holds the active channel; channels are used to publish and consume messages
let channel: Channel | null = null;

// Name of the RabbitMQ exchange
const EXCHANGE_NAME = 'socialmedia_events';

//* Establishes a connection and creates a channel
async function connectToRabbitMQ() {
  try {
    if (!ENV.RABBITMQ_URL) {
      logger.error('RabbitMQ connection failed: RABBITMQ_URL is not defined ❌');
      throw new Error('RABBITMQ_URL is not defined');
    }

    // Create a TCP connection to the RabbitMQ server
    connection = await amqp.connect(ENV.RABBITMQ_URL);
    logger.info('RabbitMQ connection established successfully 🔗');

    // Create a channel over the connection
    channel = await connection.createChannel();
    logger.info('RabbitMQ channel created successfully 📡');

    // Declare (create if not exists) a topic exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
    logger.info(`Exchange "${EXCHANGE_NAME}" is ready (type: topic) ✅`);

    return channel;
  } catch (error) {
    logger.error('Failed to connect to RabbitMQ ❌', error);
  }
}

//* Subscribes to events matching a routing key
async function consumeEvent<T>(routingKey: string, callback: (data: T) => void) {
  if (!channel) {
    logger.warn('No active RabbitMQ channel found. Reconnecting... 🔄');
    await connectToRabbitMQ();
  }

  if (!channel) {
    logger.error('Event subscription failed: RabbitMQ channel unavailable ❌');
    return;
  }

  /**
   * Create a temporary, exclusive queue.
   * - Empty name: RabbitMQ generates a unique queue name
   * - Exclusive: Queue is deleted when the connection closes
   */
  const q = await channel.assertQueue('', { exclusive: true });

  // Bind the queue to the exchange using the routing key
  await channel.bindQueue(q.queue, EXCHANGE_NAME, routingKey);

  logger.info(`Queue bound to exchange "${EXCHANGE_NAME}" with routingKey="${routingKey}" 🔗`);

  // Start consuming messages from the queue
  channel.consume(q.queue, msg => {
    if (!msg) {
      logger.warn('Received empty message from RabbitMQ ⚠️');
      return;
    }

    try {
      // Parse message content
      const content = JSON.parse(msg.content.toString()) as T;

      // Execute user-provided callback
      callback(content);

      // Acknowledge message so RabbitMQ can remove it from the queue
      channel?.ack(msg);

      logger.debug(`Message processed successfully | routingKey="${routingKey}" ✅`);
    } catch (error) {
      logger.error('Failed to process RabbitMQ message ❌', error);
    }
  });

  logger.info(`Subscribed to events | routingKey="${routingKey}" 📥`);
}

export { connectToRabbitMQ, consumeEvent };
