import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import SendGridMailService from '../services/sendgrid-mail.service';
import { SendGridVerifyMailInputDto } from '../dtos/verify-email-input.dto';
import SendGridSenderAuthentication from '../documentation/send-grid-sender-auth.documentation';

@UseGuards(AuthGuard())
@Controller({ path: 'sendgrid', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class SendGridMailController {
  constructor(private readonly sendGridMailService: SendGridMailService) {}

  @Post('sendgrid-sender-authentication')
  @HttpCode(HttpStatus.OK)
  @SendGridSenderAuthentication.Doc()
  async sendGridSenderAuthentication(
    @Body() input: SendGridVerifyMailInputDto,
  ): Promise<string> {
    return await this.sendGridMailService.verifyEmail(input);
  }
}

export default SendGridMailController;
