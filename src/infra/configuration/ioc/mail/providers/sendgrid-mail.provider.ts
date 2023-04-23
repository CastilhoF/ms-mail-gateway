import { Provider } from '@nestjs/common';
import SendGridMailInterface from '../../../../../app/shared/interfaces/sendgrid-mail.interface';
import SendGridMailService from '../../../../modules/sendgrid/services/send-mail.service';

export const SendGridMailProvider: Provider = {
  provide: SendGridMailInterface,
  useClass: SendGridMailService,
};
