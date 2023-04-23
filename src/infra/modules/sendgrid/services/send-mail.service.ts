import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Client } from '@sendgrid/client';
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
      const { email, apiKey } = input;

      const client = new Client();

      client.setApiKey(apiKey);

      const result = await client.request({
        method: 'GET',
        url: '/v3/suppression/list',
        qs: {
          email_address: email,
        },
      });

      this.logger.log(result);

      return result[0].statusCode.toString();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error sending email');
    }
  }

  async verifyDomain(domain: string, apiKey: string): Promise<any> {
    try {
      const client = new Client();

      if (!domain || !apiKey) throw new BadRequestException('Missing params');

      client.setApiKey(apiKey);

      const result = await client
        .request({
          method: 'POST',
          url: '/v3/user/webhooks/event/settings/domain_verification',
          body: {
            domain: domain,
          },
        })
        .catch((error) => {
          this.logger.error(`Error verifying domain: ${domain}`);

          if (error.code === 403)
            throw new ForbiddenException(
              `Error verifying domain: ${domain} - ${error.response.body.errors[0].message} - Field: ${error.response.body.errors[0].field}`,
            );

          throw new InternalServerErrorException(
            `Error verifying domain: ${domain}`,
          );
        });

      this.logger.log(result);

      return result[0].statusCode.toString();
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
