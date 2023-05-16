import { BullModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import BullEnvironment from './environment/bull.environment';

const configService: ConfigService = new ConfigService();
const bullEnvironment: BullEnvironment = new BullEnvironment(configService);

export const bullConfig: BullModuleOptions = {
  redis: {
    host: bullEnvironment.getCacheHost(),
    port: bullEnvironment.getCachePort(),
    password: bullEnvironment.getCachePassword(),
  },
};
