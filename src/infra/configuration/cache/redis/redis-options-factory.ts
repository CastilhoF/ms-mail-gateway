import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import RedisEnvironment from './environment/redis.environment';

@Injectable()
class RedisOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly cacheConfig: RedisEnvironment) {}

  createCacheOptions(): CacheModuleOptions<Record<string, any>> {
    return {
      host: this.cacheConfig.getCacheHost(),
      port: this.cacheConfig.getCachePort(),
      database: this.cacheConfig.getCacheLogicalDatabase(),
      password: this.cacheConfig.getCachePassword(),
      ttl: this.cacheConfig.getCacheTTL(),
      store: redisStore,
      isGlobal: true,
      max: 1000,
    };
  }
}

export default RedisOptionsFactory;
