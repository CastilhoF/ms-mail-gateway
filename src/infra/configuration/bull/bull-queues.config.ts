import { BullModuleOptions } from '@nestjs/bull';

export const sendMailQueue: BullModuleOptions = {
  name: 'send-mail',
  settings: {
    maxStalledCount: 10,
  },
};
