import { Module } from '@nestjs/common';
import SendMailProcessor from '../../../../infra/jobs/send-mail/send-mail.processor';
import SendMailUseCase from '../../../../domain/usecases/mail/send-mail.use-case';

@Module({
  imports: [],
  providers: [SendMailProcessor, SendMailUseCase],
  exports: [],
})
class QueueModule {}

export default QueueModule;
