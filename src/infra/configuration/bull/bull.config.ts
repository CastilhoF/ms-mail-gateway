import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class BullConfig implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get('CACHE_HOST'),
        port: this.configService.get('CACHE_PORT'),
        password: this.configService.get('CACHE_PASSWORD'),
        db: 1,
      },
    };
  }
}

export default BullConfig;
