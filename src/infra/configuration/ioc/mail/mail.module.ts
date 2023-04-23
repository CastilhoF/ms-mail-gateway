import { Module } from '@nestjs/common';
import { SendGridMailProvider } from './providers/sendgrid-mail.provider';
import SendGridController from '../../../../infra/modules/sendgrid/sendgrid.controller';
import SendGridMailService from '../../../../infra/modules/sendgrid/services/send-mail.service';

@Module({
  controllers: [SendGridController],
  providers: [SendGridMailProvider, SendGridMailService],
  exports: [SendGridMailProvider],
})
class MailModule {}

export default MailModule;
