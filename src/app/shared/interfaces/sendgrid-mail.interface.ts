import { SendGridSendMailInputDto } from './dtos/send-mail-input.dto';
import { SendGridVerifyMailInputDto } from './dtos/verify-email-input.dto';

abstract class SendGridMailInterface {
  abstract sendMail(payload: SendGridSendMailInputDto): Promise<void>;
  abstract verifyEmail(payload: SendGridVerifyMailInputDto): Promise<string>;
}

export default SendGridMailInterface;
