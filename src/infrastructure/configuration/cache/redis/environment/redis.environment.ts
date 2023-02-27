import CacheEnvironment from '../../base/environment/cache.environment';

class RedisEnvironment extends CacheEnvironment {
  getCacheLogicalDatabase(): number {
    return this.config.get<number>('CACHE_LOGICAL_DATABASE');
  }
}

export default RedisEnvironment;
