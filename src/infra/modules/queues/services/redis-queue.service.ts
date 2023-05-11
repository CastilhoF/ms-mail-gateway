import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import QueueServiceInterface from '../../../../app/shared/interfaces/queue-service.interface';

@Injectable()
class RedisQueueService implements QueueServiceInterface {
  private readonly logger: Logger = new Logger(RedisQueueService.name);

  constructor(private readonly redisService: RedisService) {}

  async addItemOnQueue(input: any): Promise<void> {
    try {
      if (
        !input.to ||
        !input.from ||
        !input.subject ||
        !input.text ||
        !input.html
      ) {
        throw new BadRequestException('Missing params');
      }

      const client = this.redisService.getClient();
      this.logger.debug(`Adding message to queue: ${input.to}`);
      client.lpush('send-mail', JSON.stringify(input));
    } catch (error) {
      this.logger.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Error adding message to queue');
    }
  }

  async getItemsOnQueue(): Promise<any[]> {
    const client = this.redisService.getClient();
    const messages = await client.blpop('send-mail', 0);

    if (!messages) {
      this.logger.debug('No messages found');
      return [];
    }

    return messages.map((message) => JSON.parse(message));
  }
}

export default RedisQueueService;
