import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as sendGridMail from '@sendgrid/mail';
import { SendGridSendMailInputDto } from '../dtos/send-mail-input.dto';
import { SendGridVerifyMailInputDto } from '../dtos/verify-email-input.dto';
import SendGridMailInterface from '../../../../app/shared/interfaces/sendgrid-mail.interface';

@Injectable()
class SendGridMailService implements SendGridMailInterface {
  private readonly logger: Logger = new Logger(SendGridMailService.name);

  async sendMail(input: SendGridSendMailInputDto): Promise<void> {
    try {
      const { to, from, subject, text, html, apiKey } = input;

      if (!to || !from || !subject || !text || !html || !apiKey) {
        throw new BadRequestException('Missing params');
      }

      sendGridMail.setApiKey(apiKey);

      const msg = {
        to,
        from,
        subject,
        text,
        html,
      };

      const sended = await sendGridMail.send(msg).catch((error) => {
        this.logger.error(`Error sending email to ${to}`);

        if (error.code === 403)
          throw new ForbiddenException(
            `Error sending email to ${to} - ${error.response.body.errors[0].message} - Field: ${error.response.body.errors[0].field}`,
          );

        throw new InternalServerErrorException(`Error sending email to ${to}`);
      });

      if (sended[0].statusCode === 202)
        this.logger.debug(`Email sended to ${to}`);

      return;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof BadRequestException) throw error;
      if (error instanceof ForbiddenException) throw error;
      if (error instanceof InternalServerErrorException) throw error;

      throw new InternalServerErrorException('Error sending email');
    }
  }

  async verifyEmail(input: SendGridVerifyMailInputDto): Promise<string> {
    try {
      const subject = 'Sending with SendGrid is Fun';
      const text = 'and easy to do anywhere, even with Node.js';
      const html =
        '<strong>and easy to do anywhere, even with Node.js</strong>';

      const payload: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        input.email,
        input.email,
        subject,
        text,
        html,
        input.apiKey,
      );

      await this.sendMail(payload);

      this.logger.debug(`Email ${input.email} validated successfully`);

      return 'Email validated successfully';
    } catch (error) {
      this.logger.error(error);

      if (error instanceof BadRequestException) throw error;
      if (error instanceof ForbiddenException) throw error;
      if (error instanceof InternalServerErrorException) throw error;

      throw new InternalServerErrorException('Error sending email');
    }
  }
}

export default SendGridMailService;
