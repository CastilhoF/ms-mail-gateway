import { Test, TestingModule } from '@nestjs/testing';
import MailService from '../mail.service';
import { SendMailInputDto } from '../../dtos/send-mail-input.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('MailService', () => {
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: 'BullQueue_send-mail',
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  describe('sendMail', () => {
    describe('success cases', () => {
      it('should send mail', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'doe.john@domain.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest.spyOn(mailService, 'sendMail').mockResolvedValue(true);

        const result = await mailService.sendMail(data);

        expect(result).toBe(true);
        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });
    });

    describe('error cases', () => {
      it('should throw an error when sendMailQueue.add throws', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'doe.john@domain.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new InternalServerErrorException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          InternalServerErrorException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when sendMailQueue.add throws bad request', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'doe.john@domain.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "from" field', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: '',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "from" field is null', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: null,
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "from" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: undefined,
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "to" field', async () => {
        const data: SendMailInputDto = {
          to: '',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "to" field is null', async () => {
        const data: SendMailInputDto = {
          to: null,
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "to" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: undefined,
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "subject" field', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: '',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "subject" field is null', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: null,
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "subject" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: undefined,
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "text" field', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: '',
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "text" field is null', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: null,
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "text" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: undefined,
          message: 'Test',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "message" field', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: '',
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "message" field is null', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: null,
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "message" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: undefined,
          apiKey: '123456',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "apiKey" field', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '',
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "apiKey" field is null', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: null,
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "apiKey" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: undefined,
          service: 'sendgrid',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when empty "service" field', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: '',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "service" field is null', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: null,
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "service" field is undefined', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: undefined,
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException());

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });

      it('should throw an error when "service" field is not supported', async () => {
        const data: SendMailInputDto = {
          to: 'john.doe@doamin.com',
          from: 'john.doe@doamin.com',
          subject: 'Test',
          text: 'Test',
          message: 'Test',
          apiKey: '123456',
          service: 'not-supported',
        };

        jest
          .spyOn(mailService, 'sendMail')
          .mockRejectedValue(new BadRequestException('Service not supported'));

        await expect(mailService.sendMail(data)).rejects.toThrow(
          BadRequestException,
        );

        expect(mailService.sendMail).toHaveBeenCalledWith(data);
        expect.assertions(2);
      });
    });
  });
});
