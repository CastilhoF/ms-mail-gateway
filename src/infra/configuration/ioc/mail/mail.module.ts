import { Module } from '@nestjs/common';
import { SendGridMailProvider } from './providers/sendgrid-mail.provider';
import SendGridMailService from '../../../../infra/modules/sendgrid/services/sendgrid-mail.service';

@Module({
  controllers: [],
  providers: [SendGridMailProvider, SendGridMailService],
  exports: [SendGridMailProvider],
})
class MailModule {}

export default MailModule;
