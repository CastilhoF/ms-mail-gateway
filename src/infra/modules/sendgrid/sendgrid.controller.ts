import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import SendGridMailService from './services/send-mail.service';
import { SendGridSendMailInputDto } from './dtos/send-mail-input.dto';
import { SendGridVerifyMailInputDto } from './dtos/verify-email-input.dto';

@Controller({ path: 'sendgrid', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class SendGridController {
  constructor(private readonly sendGridMailService: SendGridMailService) {}
  @Post('send-mail')
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendMail(@Body() input: SendGridSendMailInputDto): Promise<void> {
    return await this.sendGridMailService.sendMail(input);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Body() input: SendGridVerifyMailInputDto,
  ): Promise<string> {
    return await this.sendGridMailService.verifyEmail(input);
  }

  @Post('verify-domain/:domain')
  @HttpCode(HttpStatus.OK)
  async verifyDomain(
    @Param('domain') domain: string,
    @Body() input: any,
  ): Promise<string> {
    const apiKey = input.apiKey;
    return await this.sendGridMailService.verifyDomain(domain, apiKey);
  }
}

export default SendGridController;
