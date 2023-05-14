import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import SendMailUseCase from '../../../domain/usecases/mail/send-mail.use-case';
import { Job } from 'bull';
import { SendMailInputDto } from '../../../domain/usecases/mail/dtos/send-mail-input.dto';

@Processor('send-mail')
class SendMailProcessor {
  private readonly logger: Logger = new Logger(SendMailProcessor.name);

  constructor(private readonly sendMailUseCase: SendMailUseCase) {}

  @Process('sending')
  async sending(mailJob: Job<SendMailInputDto>): Promise<void> {
    this.logger.log(`Processing job id: ${mailJob.id}`);

    const sended: boolean = await this.sendMailUseCase.execute(mailJob.data);

    if (sended) {
      this.logger.log(`Mail sent to ${mailJob.data.to}`);
    } else {
      this.logger.error(`Mail not sent to ${mailJob.data.to}`);
    }
  }
}

export default SendMailProcessor;
