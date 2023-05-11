import { Module } from '@nestjs/common';
import { SendGridMailProvider } from './providers/sendgrid-mail.provider';
import SendGridMailService from '../../../../infra/modules/sendgrid/services/sendgrid-mail.service';
import SendMailUseCase from '../../../../domain/usecases/mail/send-mail.use-case';
import SendMailVerificationUseCase from '../../../../domain/usecases/mail/send-mail-verification.use-case';
import SendGridMailController from '../../../modules/sendgrid/sendgrid.controller';

@Module({
  controllers: [SendGridMailController],
  providers: [
    SendGridMailProvider,
    SendGridMailService,
    SendMailUseCase,
    SendMailVerificationUseCase,
  ],
  exports: [SendGridMailProvider, SendMailUseCase, SendMailVerificationUseCase],
})
class MailModule {}

export default MailModule;
