import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import SendGridMailService from '../services/sendgrid-mail.service';
import { SendGridVerifyMailInputDto } from '../dtos/verify-email-input.dto';

@Controller({ path: 'sendgrid', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class SendGridMailController {
  constructor(private readonly sendGridMailService: SendGridMailService) {}

  @Post('sendgrid-sender-authentication')
  @HttpCode(HttpStatus.OK)
  async sendGridSenderAuthentication(
    @Body() input: SendGridVerifyMailInputDto,
  ): Promise<string> {
    return await this.sendGridMailService.verifyEmail(input);
  }
}

export default SendGridMailController;
