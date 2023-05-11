import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import SendGridMailService from './services/sendgrid-mail.service';
import { SendGridSendMailInputDto } from './dtos/send-mail-input.dto';

@Controller({ path: 'sendgrid', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class SendGridMailController {
  constructor(private readonly sendGridMailService: SendGridMailService) {}

  @Post('send-mail')
  @HttpCode(HttpStatus.OK)
  async sendMail(@Body() input: SendGridSendMailInputDto): Promise<void> {
    return await this.sendGridMailService.sendMail(input);
  }
}

export default SendGridMailController;
