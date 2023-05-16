import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendMailInputDto } from '../dtos/send-mail-input.dto';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { ServiceEnum } from '../dtos/service.enum';
import MailEnvironment from '../../../../infra/configuration/mail/environment/mail.environment';

@Injectable()
class MailService {
  private readonly logger: Logger = new Logger(MailService.name);
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
    private readonly mailEnvironment: MailEnvironment,
  ) {}

  async sendMail(data: SendMailInputDto): Promise<any> {
    try {
      const { to, from, subject, message, apiKey, service } = data;

      if (!to || !from || !subject || !message || !apiKey || !service) {
        throw new BadRequestException('Missing required fields');
      }

      if (service !== ServiceEnum[service.toUpperCase()]) {
        throw new BadRequestException('Service not supported');
      }

      const template = readFileSync(
        this.mailEnvironment.getTemplatePath(),
        'utf-8',
      );

      const render = compile(template);

      const host = to.split('@')[1];

      const brazilTime = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      });

      const html = render({
        host,
        from: from,
        recipient: to,
        subject: subject,
        text: message,
        date: brazilTime,
      });

      const payload: SendMailInputDto = {
        from: to,
        to: to,
        subject: subject,
        text: message,
        html,
        apiKey: apiKey,
        service: service,
      };

      const sended = await this.sendMailQueue
        .add('sending', payload, {
          removeOnComplete: true,
        })
        .catch((error) => {
          this.logger.error(error);
          throw new BadRequestException(error.message);
        });

      if (!sended) {
        throw new BadRequestException('Error sending mail');
      }

      this.logger.log(`Mail sent to queue`);

      return true;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}

export default MailService;
