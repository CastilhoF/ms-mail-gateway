import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SendGridMailInterface from '../../../app/shared/interfaces/sendgrid-mail.interface';
import SendMailInputValidation from '../../shared/validations/send-mail-input.validation';
import { SendMailInputDto } from './dtos/send-mail-input.dto';

@Injectable()
export default class SendMailUseCase
  implements BaseUseCase<SendMailInputDto, boolean>
{
  private readonly logger: Logger = new Logger(SendMailUseCase.name);

  constructor(private readonly sendGridMail: SendGridMailInterface) {}

  async execute(input: SendMailInputDto): Promise<boolean> {
    await new SendMailInputValidation().validate(input);

    const { to, subject, html, text, from, apiKey, service } = input;

    switch (service) {
      case 'sendgrid':
        this.logger.log(`Sending mail with sendgrid`);
        await this.sendGridMail.sendMail({
          to,
          subject,
          html,
          text,
          from,
          apiKey,
        });
        break;
    }

    this.logger.log(`Mail sent successfully`);
    return true;
  }
}
