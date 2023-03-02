import { CacheModule as CacheModuleNative, Module } from '@nestjs/common';
import { ClientOpts } from 'redis';
import redisModuleOptions from './provider/redis.provider';

@Module({
  imports: [CacheModuleNative.registerAsync<ClientOpts>(redisModuleOptions)],
  providers: [],
})
class CacheModule {}

export default CacheModule;
