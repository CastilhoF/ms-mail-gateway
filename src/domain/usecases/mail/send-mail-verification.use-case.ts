import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SendGridMailInterface from '../../../app/shared/interfaces/sendgrid-mail.interface';
import { SendMailVerificationInputDto } from './dtos/send-mail-verification-input.dto';
import DomainException from '../../../domain/entities/shared/exceptions/domain.exception';

@Injectable()
export default class SendMailVerificationUseCase
  implements BaseUseCase<SendMailVerificationInputDto, boolean>
{
  private readonly logger: Logger = new Logger(
    SendMailVerificationInputDto.name,
  );

  constructor(private readonly sendGridMail: SendGridMailInterface) {}

  async execute(input: SendMailVerificationInputDto): Promise<boolean> {
    if (!input.apiKey) {
      this.logger.error(`API key is required`);
      throw new DomainException('API key is required');
    }
    if (!input.service) {
      this.logger.error(`Service is required`);
      throw new DomainException('Service is required');
    }

    if (!input.email) {
      this.logger.error(`Email is required`);
      throw new DomainException('Email is required');
    }

    const { email, apiKey, service } = input;

    switch (service) {
      case 'sendgrid':
        this.logger.log(`Sending mail with sendgrid`);
        await this.sendGridMail.verifyEmail({
          email,
          apiKey,
        });
        break;
    }

    this.logger.log(`Mail sent successfully`);
    return true;
  }
}
