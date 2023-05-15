import { SendGridVerifyMailInputDto } from '../../dtos/verify-email-input.dto';
import SendGridService from '../../services/sendgrid-mail.service';
import SendGridController from '../sendgrid.controller';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('sendgrid controller', () => {
  let sendGridService: SendGridService;
  let sendGridController: SendGridController;

  beforeEach(() => {
    sendGridService = new SendGridService();
    sendGridController = new SendGridController(sendGridService);
  });

  describe('verify email', () => {
    describe('success cases', () => {
      const inputMockSuccess: SendGridVerifyMailInputDto = {
        email: 'doe.john@domain.com',
        apiKey:
          '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',
      };
      it('should verify email with success', async () => {
        jest
          .spyOn(sendGridService, 'verifyEmail')
          .mockResolvedValueOnce('Email validated successfully');

        const result = await sendGridController.sendGridSenderAuthentication(
          inputMockSuccess,
        );

        expect(result).toEqual('Email validated successfully');
      });
    });

    describe('error cases', () => {
      it('should verify email with rejected - email empty', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: '',
          apiKey:
            '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',
        };

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(BadRequestException);
      });

      it('should verify email with rejected - email null', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: null,
          apiKey:
            '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',
        };

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(BadRequestException);
      });

      it('should verify email with rejected - email undefined', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: undefined,
          apiKey:
            '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',
        };

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(BadRequestException);
      });

      it('should verify email with rejected - api key empty', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: 'doe.john@domain.com',
          apiKey: '',
        };

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(BadRequestException);
      });

      it('should verify email with rejected - api key null', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: 'doe.john@domain.com',
          apiKey: null,
        };

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(BadRequestException);
      });

      it('should verify email with rejected - api key undefined', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: 'doe.john@domain.com',
          apiKey: undefined,
        };

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(BadRequestException);
      });

      it('should verify email with rejected - sendgrid service throws error', async () => {
        const inputMockSuccess: SendGridVerifyMailInputDto = {
          email: 'doe.john@domain.com',
          apiKey:
            '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',
        };

        jest
          .spyOn(sendGridService, 'verifyEmail')
          .mockRejectedValueOnce(
            new InternalServerErrorException('Error to send email'),
          );

        await expect(
          sendGridController.sendGridSenderAuthentication(inputMockSuccess),
        ).rejects.toThrow(InternalServerErrorException);
        expect(sendGridService.verifyEmail).toHaveBeenCalledTimes(1);
        expect.assertions(2);
      });
    });
  });
});
