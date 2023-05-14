import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SendGridMailProvider } from './providers/sendgrid-mail.provider';
import SendGridMailService from '../../../../infra/modules/sendgrid/services/sendgrid-mail.service';
import MailService from '../../../../infra/modules/mail/service/mail.service';
import { BullModule } from '@nestjs/bull';
import { sendMailQueue } from '../../bull/bull-queues.config';
import MailController from '../../../../infra/modules/mail/controller/mail.controller';
import SendGridMailController from '../../../../infra/modules/sendgrid/controller/sendgrid.controller';

@Global()
@Module({
  controllers: [MailController, SendGridMailController],
  imports: [
    BullModule.registerQueue(sendMailQueue),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [SendGridMailProvider, SendGridMailService, MailService],
  exports: [SendGridMailProvider, MailService],
})
class MailModule {}

export default MailModule;
