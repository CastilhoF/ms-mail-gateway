import RedisEnvironment from '../../../cache/redis/environment/redis.environment';

class BullEnvironment extends RedisEnvironment {
  getSendMailQueueName(): string {
    return this.config.get<string>('BULL_SEND_MAIL_QUEUE_NAME');
  }

  getSendMailQueueLimiter(): number {
    return this.config.get<number>('BULL_SEND_MAIL_QUEUE_LIMITER');
  }

  getSendMailQueueDelay(): number {
    return this.config.get<number>('BULL_SEND_MAIL_QUEUE_DELAY');
  }
}

export default BullEnvironment;
