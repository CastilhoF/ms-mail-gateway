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

@Injectable()
class MailService {
  private readonly logger: Logger = new Logger(MailService.name);
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
  ) {}

  async sendMail(data: SendMailInputDto): Promise<any> {
    try {
      this.logger.log(`Sending mail to ${data.to}`);

      const template = readFileSync(
        './src/infra/modules/mail/template/send-mail-template.hbs',
        'utf-8',
      );

      const render = compile(template);

      const host = data.to.split('@')[1];

      const brazilTime = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      });

      const html = render({
        host,
        from: data.from,
        recipient: data.to,
        subject: data.subject,
        text: data.message,
        date: brazilTime,
      });

      const payload: SendMailInputDto = {
        from: data.to,
        to: data.to,
        subject: data.subject,
        text: data.message,
        html,
        apiKey: data.apiKey,
        service: data.service,
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
