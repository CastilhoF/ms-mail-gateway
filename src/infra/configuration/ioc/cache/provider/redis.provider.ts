import { CacheModuleAsyncOptions } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import RedisEnvironment from '../../../cache/redis/environment/redis.environment';
import RedisOptionsFactory from '../../../cache/redis/redis-options-factory';

const redisModuleOptions: CacheModuleAsyncOptions<ClientOpts> = {
  useClass: RedisOptionsFactory,
  isGlobal: true,
  extraProviders: [RedisEnvironment],
};

export default redisModuleOptions;
