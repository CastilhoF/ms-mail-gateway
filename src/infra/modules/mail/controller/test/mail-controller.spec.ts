import { SendMailInputDto } from '../../dtos/send-mail-input.dto';
import MailService from '../../service/mail.service';
import MailController from '../mail.controller';
import MailEnvironment from '../../../../../infra/configuration/mail/environment/mail.environment';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { JwtStrategyOutputDto } from 'src/infra/modules/authentication/dtos/jwt-strategy-output.dto';
import { BadRequestException } from '@nestjs/common';

describe('mail controller', () => {
  let mailService: MailService;
  let mailController: MailController;
  let sendMailQueue: Queue<'send-mail'>;

  const configService: ConfigService = new ConfigService();

  const mailEnvironment: MailEnvironment = new MailEnvironment(configService);

  beforeEach(() => {
    mailService = new MailService(sendMailQueue, mailEnvironment);
    mailController = new MailController(mailService);
  });

  describe('send mail', () => {
    describe('success cases', () => {
      const inputMockSuccess: SendMailInputDto = {
        from: 'doe.john@domain.com',
        subject: 'Test',
        message: 'Test',
      };

      const clientConnectedMock: JwtStrategyOutputDto = {
        client: 'domain for web',
        host: 'domain.com',
        apiKey: 'dbe7dc3f7e69f6274a839e7937b72f1c8fe94de488d561069b4368',
        senderInformation: {
          email: 'contact@domain.com',
          apiKey:
            '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',
          validated: true,
        },
      };

      it('should send mail with success', async () => {
        jest.spyOn(mailService, 'sendMail').mockResolvedValueOnce(true);

        const result = await mailController.sendMail(
          inputMockSuccess,
          clientConnectedMock,
        );

        expect(result).toEqual({
          status: 200,
          message: 'Mail sent',
        });
      });
    });

    describe('error cases', () => {
      const clientConnectedMock: JwtStrategyOutputDto = {
        client: 'domain for web',
        host: 'domain.com',
        apiKey: 'dbe7dc3f7e69f6274a839e7937b72f1c8fe94de488d561069b4368',
        senderInformation: {
          email: 'contact@domain.com',
          apiKey:
            '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',
          validated: true,
        },
      };

      it('should return error when send mail fails - from empty', async () => {
        const inputMockError: SendMailInputDto = {
          from: '',
          subject: 'Test',
          message: 'Test',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - from null', async () => {
        const inputMockError: SendMailInputDto = {
          from: null,
          subject: 'Test',
          message: 'Test',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - from undefined', async () => {
        const inputMockError: SendMailInputDto = {
          from: undefined,
          subject: 'Test',
          message: 'Test',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - subject empty', async () => {
        const inputMockError: SendMailInputDto = {
          from: 'john.doe@domain.com',
          subject: '',
          message: 'Test',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - subject null', async () => {
        const inputMockError: SendMailInputDto = {
          from: 'john.doe@domain.com',
          subject: null,
          message: 'Test',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - subject undefined', async () => {
        const inputMockError: SendMailInputDto = {
          from: 'john.doe@domain.com',
          subject: undefined,
          message: 'Test',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - message empty', async () => {
        const inputMockError: SendMailInputDto = {
          from: 'john.doe@domain.com',
          subject: 'Test',
          message: '',
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - message null', async () => {
        const inputMockError: SendMailInputDto = {
          from: 'john.doe@domain.com',
          subject: 'Test',
          message: null,
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });

      it('should return error when send mail fails - message undefined', async () => {
        const inputMockError: SendMailInputDto = {
          from: 'john.doe@domain.com',
          subject: 'Test',
          message: undefined,
        };

        const error = new BadRequestException();

        jest.spyOn(mailService, 'sendMail').mockRejectedValue(error);

        await expect(
          mailController.sendMail(inputMockError, clientConnectedMock),
        ).rejects.toThrow(BadRequestException);
        expect.assertions(1);
      });
    });
  });
});
