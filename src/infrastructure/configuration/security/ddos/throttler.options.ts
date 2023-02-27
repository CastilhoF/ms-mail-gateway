import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerOptions: ThrottlerModuleOptions = {
  ttl: 60,
  limit: 20,
};

export default throttlerOptions;
