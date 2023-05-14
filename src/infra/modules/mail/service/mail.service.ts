import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendMailInputDto } from '../dtos/send-mail-input.dto';

@Injectable()
class MailService {
  private readonly logger: Logger = new Logger(MailService.name);
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
  ) {}

  async sendMail(data: SendMailInputDto): Promise<any> {
    try {
      this.logger.log(`Sending mail to ${data.to}`);
      const sended = await this.sendMailQueue
        .add('sending', data, {
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
