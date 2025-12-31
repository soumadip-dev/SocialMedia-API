import * as amqp from 'amqplib';
import type { Channel, ChannelModel } from 'amqplib';

import { ENV } from '../config/env.config';
import logger from './logger.utils';

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

const EXCHANGE_NAME = 'socialmedia_events';

async function connectToRabbitMQ() {
  try {
    connection = await amqp.connect(ENV.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
    logger.info('Connected to rabbit mq ✅');
    return channel;
  } catch (e) {
    logger.error('Error connecting to rabbit mq ❌', e);
  }
}

async function publishEvent(routingKey: string, message: unknown) {
  if (!channel) {
    await connectToRabbitMQ();
  }

  channel && channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));
  logger.info(`Event published: ${routingKey} ✅`);
}

export { connectToRabbitMQ, publishEvent };
