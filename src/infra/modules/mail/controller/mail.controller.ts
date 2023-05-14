import {
  Body,
  UseGuards,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import MailService from '../service/mail.service';
import { SendMailInputDto } from '../dtos/send-mail-input.dto';
import { GetClientPayload } from '../../../../app/shared/decorators/get-client-payload.decorator';
import SendMail from '../documentation/send.mail.documentation';
import { JwtStrategyOutputDto } from '../../authentication/dtos/jwt-strategy-output.dto';

@UseGuards(AuthGuard())
@Controller({ path: 'mail', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-mail')
  @HttpCode(HttpStatus.OK)
  @SendMail.Doc()
  async sendMail(
    @Body() sendMailInputDto: SendMailInputDto,
    @GetClientPayload() client: JwtStrategyOutputDto,
  ): Promise<any> {
    const { senderInformation } = client;
    sendMailInputDto.from = senderInformation.email;
    sendMailInputDto.apiKey = senderInformation.apiKey;
    sendMailInputDto.service = 'SendGrid';

    const result = await this.mailService.sendMail(sendMailInputDto);

    if (!result) {
      return {
        status: 400,
        message: 'Error sending mail',
      };
    } else {
      return {
        status: 200,
        message: 'Mail sent',
      };
    }
  }
}

export default MailController;
