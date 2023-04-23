import { Test, TestingModule } from '@nestjs/testing';
import SendGridMailService from '../sendgrid-mail.service';
import { SendGridSendMailInputDto } from '../../dtos/send-mail-input.dto';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SendGridVerifyMailInputDto } from '../../dtos/verify-email-input.dto';

describe('SendGridMailService', () => {
  let sendGridMailService: SendGridMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendGridMailService],
    }).compile();

    sendGridMailService = module.get<SendGridMailService>(SendGridMailService);
  });

  describe('sendMail', () => {
    const to = 'test@domain.com';
    const from = 'test@domain.com';
    const subject = 'Sending with SendGrid is Fun';
    const text = 'and easy to do anywhere, even with Node.js';
    const html = '<strong>and easy to do anywhere, even with Node.js</strong>';
    const apiKey =
      'SG.2YDFu1MxNgbaAOAQyypgo.VtWx4fC7U_M3M7oNCHQrc_o0ypT9GzT7OjFl0GfA4SRQ';

    const sendgridErrorMock = {
      response: {
        body: {
          errors: [],
        },
      },
    };

    sendgridErrorMock.response.body.errors['message'] = 'error';
    sendgridErrorMock.response.body.errors['field'] = 'field';

    const mockForbiddenException = new ForbiddenException(
      `Error sending email to ${to} - message - Field: field`,
    );

    const mockBadRequestException = new BadRequestException('Missing params');

    const mockInternalServerErrorException = new InternalServerErrorException(
      `Error sending email to ${to}`,
    );

    const mock2InternalServerErrorException = new InternalServerErrorException(
      `Error sending email`,
    );

    it('should send email', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        html,
        apiKey,
      );

      jest.spyOn(sendGridMailService, 'sendMail').mockResolvedValue(null);

      const result = await sendGridMailService.sendMail(input);

      expect(result).toBeNull();
      expect(sendGridMailService.sendMail).toHaveBeenCalledWith(input);
      expect.assertions(2);
    });

    it('throw an error when sendMail is called with no "to" param - null', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        null,
        from,
        subject,
        text,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "to" param - undefined', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        undefined,
        from,
        subject,
        text,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "from" param - null', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        null,
        subject,
        text,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "from" param - undefined', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        undefined,
        subject,
        text,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "subject" param - null', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        null,
        text,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "subject" param - undefined', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        undefined,
        text,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "text" param - null', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        null,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "text" param - undefined', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        undefined,
        html,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "html" param - null', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        null,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "html" param - undefined', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        undefined,
        apiKey,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "apiKey" param - null', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        html,
        null,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "apiKey" param - undefined', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        html,
        undefined,
      );

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when send function return forbidden exception ', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        html,
        apiKey,
      );

      jest
        .spyOn(sendGridMailService, 'sendMail')
        .mockRejectedValue(mockForbiddenException);

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        ForbiddenException,
      );

      expect.assertions(1);
    });

    it('throw an error when send function return internal server error exception ', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        html,
        apiKey,
      );

      jest
        .spyOn(sendGridMailService, 'sendMail')
        .mockRejectedValue(mockInternalServerErrorException);

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect.assertions(1);
    });

    it('throw an error when send function return unknown exception ', async () => {
      const input: SendGridSendMailInputDto = new SendGridSendMailInputDto(
        to,
        from,
        subject,
        text,
        html,
        apiKey,
      );

      jest
        .spyOn(sendGridMailService, 'sendMail')
        .mockRejectedValue(mock2InternalServerErrorException);

      await expect(sendGridMailService.sendMail(input)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect.assertions(1);
    });
  });

  describe('verifyEmail', () => {
    const email = 'test@domain.com';
    const to = 'test@domain.com';
    const apiKey =
      'SG.2YDFu1MxNgbaAOAQyypgo.VtWx4fC7U_M3M7oNCHQrc_o0ypT9GzT7OjFl0GfA4SRQ';

    const sendgridErrorMock = {
      response: {
        body: {
          errors: [],
        },
      },
    };

    sendgridErrorMock.response.body.errors['message'] = 'error';
    sendgridErrorMock.response.body.errors['field'] = 'field';

    const mockInput: SendGridVerifyMailInputDto = {
      email: email,
      apiKey: apiKey,
    };

    const mockForbiddenException = new ForbiddenException(
      `Error sending email to ${to} - message - Field: field`,
    );

    const mockBadRequestException = new BadRequestException('Missing params');

    const mockInternalServerErrorException = new InternalServerErrorException(
      `Error sending email to ${to}`,
    );

    const mock2InternalServerErrorException = new InternalServerErrorException(
      `Error sending email`,
    );

    it('should send verify email', async () => {
      const input: SendGridVerifyMailInputDto = mockInput;

      jest.spyOn(sendGridMailService, 'sendMail').mockResolvedValue(null);

      jest
        .spyOn(sendGridMailService, 'verifyEmail')
        .mockResolvedValue(`Email sent to ${input.email}`);

      const result = await sendGridMailService.verifyEmail(input);

      expect(result).toBe(`Email sent to ${input.email}`);
      expect(sendGridMailService.verifyEmail).toHaveBeenCalledWith(input);
      expect.assertions(2);
    });

    it('throw an error when sendMail is called with no "email" param - null', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: null,
        apiKey: apiKey,
      };

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "email" param - undefined', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: undefined,
        apiKey: apiKey,
      };

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "apiKey" param - null', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: email,
        apiKey: null,
      };

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when sendMail is called with no "apiKey" param - undefined', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: email,
        apiKey: undefined,
      };

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        mockBadRequestException,
      );

      expect.assertions(1);
    });

    it('throw an error when send function return forbidden exception ', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: email,
        apiKey: apiKey,
      };

      jest
        .spyOn(sendGridMailService, 'sendMail')
        .mockRejectedValue(mockForbiddenException);

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        ForbiddenException,
      );

      expect.assertions(1);
    });

    it('throw an error when send function return internal server error exception ', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: email,
        apiKey: apiKey,
      };

      jest
        .spyOn(sendGridMailService, 'sendMail')
        .mockRejectedValue(mockInternalServerErrorException);

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect.assertions(1);
    });

    it('throw an error when send function return unknown exception ', async () => {
      const input: SendGridVerifyMailInputDto = {
        email: email,
        apiKey: apiKey,
      };

      jest
        .spyOn(sendGridMailService, 'sendMail')
        .mockRejectedValue(mock2InternalServerErrorException);

      await expect(sendGridMailService.verifyEmail(input)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect.assertions(1);
    });
  });
});
