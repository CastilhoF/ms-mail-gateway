import { SendMailInputDto } from '../../usecases/mail/dtos/send-mail-input.dto';
import DomainException from '../../entities/shared/exceptions/domain.exception';
import { Logger } from '@nestjs/common';

class SendMailInputValidation {
  private readonly logger: Logger = new Logger(SendMailInputValidation.name);

  async validate(input: SendMailInputDto): Promise<boolean> {
    if (!input.from) {
      this.logger.error('From is required');
      throw new DomainException('From is required');
    }

    if (!input.to) {
      this.logger.error('To is required');
      throw new DomainException('To is required');
    }

    if (!input.subject) {
      this.logger.error('Subject is required');
      throw new DomainException('Subject is required');
    }

    if (!input.text) {
      this.logger.error('Text is required');
      throw new DomainException('Text is required');
    }

    if (!input.html) {
      this.logger.error('Html is required');
      throw new DomainException('Html is required');
    }

    if (!input.apiKey) {
      this.logger.error('Api Key is required');
      throw new DomainException('Api Key is required');
    }

    if (!input.service) {
      this.logger.error('Service is required');
      throw new DomainException('Service is required');
    }

    return true;
  }
}

export default SendMailInputValidation;
