import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSenderDto } from '../../dtos/default-sender.dto';
import { FindManyInputDto } from '../../dtos/find-many-input.dto';
import { FindManyOutputDto } from '../../dtos/find-many-output.dto';
import SenderService from '../sender.service';
import { CreateSenderInputDto } from '../../dtos/create-sender-input.dto';

describe('SenderService', () => {
  let senderService: SenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenderService],
    }).compile();

    senderService = module.get<SenderService>(SenderService);
  });

  describe('sender service', () => {
    it('should be defined', () => {
      expect(senderService).toBeDefined();
    });
  });

  describe('create sender', () => {
    it('should return a sender', async () => {
      const senderMock: DefaultSenderDto = {
        uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        name: 'Example',
        email: 'example@domain.com',
        service: 'SendGrid',
        senderApiKey: 'SG.1234567890',
        validated: false,
        clientUid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        createdAt: new Date('2023-03-29T11:10:49.769Z'),
        updatedAt: new Date('2023-03-29T11:10:49.769Z'),
      };

      const input: CreateSenderInputDto = new CreateSenderInputDto(
        senderMock.name,
        senderMock.email,
        senderMock.service,
        senderMock.senderApiKey,
        senderMock.clientUid,
      );

      jest.spyOn(senderService, 'createSender').mockResolvedValue(senderMock);

      expect(await senderService.createSender(input)).toEqual(senderMock);
    });
  });

  describe('delete sender', () => {
    const input = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should return a sender', async () => {
      jest.spyOn(senderService, 'deleteSender').mockResolvedValue();

      expect(await senderService.deleteSender(input)).toBeUndefined();
    });
  });

  describe('find all senders', () => {
    it('should return a list of senders', async () => {
      const senderMock: DefaultSenderDto = {
        uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        name: 'Example',
        email: 'example@domain.com',
        service: 'SendGrid',
        senderApiKey: 'SG.1234567890',
        validated: false,
        clientUid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        createdAt: new Date('2023-03-29T11:10:49.769Z'),
        updatedAt: new Date('2023-03-29T11:10:49.769Z'),
      };

      const senderListMock: DefaultSenderDto[] = [senderMock];

      jest
        .spyOn(senderService, 'findAllSenders')
        .mockResolvedValue(senderListMock);

      expect(await senderService.findAllSenders()).toEqual(senderListMock);
    });
  });

  describe('find many senders', () => {
    const senderMock: DefaultSenderDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      name: 'Example',
      email: 'example@domain.com',
      service: 'SendGrid',
      senderApiKey: 'SG.1234567890',
      validated: false,
      clientUid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const input: FindManyInputDto = {
      pagination: {
        page: 1,
        limit: 10,
      },
      data: {
        name: 'Example',
      },
    };

    const output: FindManyOutputDto = {
      entities: [senderMock],
      total: 1,
    };

    it('should return a list of senders', async () => {
      jest.spyOn(senderService, 'findManySenders').mockResolvedValue(output);

      expect(await senderService.findManySenders(input)).toEqual(output);
    });
  });

  describe('change sender validation', () => {
    it('should return a change message', async () => {
      const input: Partial<DefaultSenderDto> = {
        uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        validated: true,
      };

      const output = `Validated successfully changed for sender: ${input.uid}`;

      jest
        .spyOn(senderService, 'changeSenderValidated')
        .mockResolvedValue(output);

      expect(await senderService.changeSenderValidated(input)).toEqual(output);
    });
  });

  describe('find sender by client uid', () => {
    const senderMock: DefaultSenderDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      name: 'Example',
      email: 'example@domain.com',
      service: 'SendGrid',
      senderApiKey: 'SG.1234567890',
      validated: false,
      clientUid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const input = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should find sender by client uid and return sender', async () => {
      jest
        .spyOn(senderService, 'findSenderByClientUid')
        .mockResolvedValue(senderMock);

      expect(await senderService.findSenderByClientUid(input)).toEqual(
        senderMock,
      );
    });
  });

  describe('patch sender by partial dto', () => {
    const input: Partial<DefaultSenderDto> = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      email: 'examplePached@domain.com',
    };

    const senderPatchedMock: DefaultSenderDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      name: 'Example',
      email: 'examplePatched@domain.com',
      service: 'SendGrid',
      senderApiKey: 'SG.1234567890',
      validated: false,
      clientUid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should patch sender by partial dto and return patched sender', async () => {
      jest
        .spyOn(senderService, 'patchSender')
        .mockResolvedValue(senderPatchedMock);

      expect(await senderService.patchSender(input)).toEqual(senderPatchedMock);
    });
  });
});
