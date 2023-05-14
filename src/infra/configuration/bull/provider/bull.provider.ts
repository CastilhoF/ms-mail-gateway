import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import BullConfig from '../bull.config';

export const bullProvider: SharedBullAsyncConfiguration = {
  useClass: BullConfig,
};
