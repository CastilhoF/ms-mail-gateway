import {
  CacheModule as CacheModuleNative,
  Global,
  Module,
} from '@nestjs/common';
import { ClientOpts } from 'redis';
import redisModuleOptions from './provider/redis.provider';

@Global()
@Module({
  imports: [CacheModuleNative.registerAsync<ClientOpts>(redisModuleOptions)],
  providers: [],
})
class CacheModule {}

export default CacheModule;
