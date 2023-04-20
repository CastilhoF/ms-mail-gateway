import { DefaultSenderDto } from '../../dtos/default-sender.dto';
import { FindManyInputDto } from '../../dtos/find-many-input.dto';
import { FindManyOutputDto } from '../../dtos/find-many-output.dto';
import SenderService from '../../services/sender.service';
import SenderController from '../sender.controller';
import SenderRepository from '../../../../../app/repositories/sender/sender.repository';
import ChangeSenderValidatedUseCase from '../../../../../domain/usecases/sender/change-sender-validated.use-case';
import CreateSenderUseCase from '../../../../../domain/usecases/sender/create-sender.use-case';
import DeleteSenderUseCase from '../../../../../domain/usecases/sender/delete-sender.use-case';
import FindAllSendersUseCase from '../../../../../domain/usecases/sender/find-all-senders.use-case';
import FindManySendersUseCase from '../../../../../domain/usecases/sender/find-many-senders.use-case';
import FindSenderByClientUidUseCase from '../../../../../domain/usecases/sender/find-sender-by-client-uid.use-case';
import PatchSenderUseCase from '../../../../../domain/usecases/sender/patch-sender.use-case';
import UidGeneratorInterface from '../../../../../app/shared/interfaces/uid-generator.interface';
import { CreateSenderInputDto } from '../../dtos/create-sender-input.dto';

describe('SenderController', () => {
  let senderController: SenderController;
  let senderService: SenderService;
  let senderRepository: SenderRepository;
  let uidGenerator: UidGeneratorInterface;

  const createSenderUseCase: CreateSenderUseCase = new CreateSenderUseCase(
    senderRepository,
    uidGenerator,
  );

  const deleteSenderUseCase: DeleteSenderUseCase = new DeleteSenderUseCase(
    senderRepository,
  );

  const findAllSendersUseCase: FindAllSendersUseCase =
    new FindAllSendersUseCase(senderRepository);

  const findManySendersUseCase: FindManySendersUseCase =
    new FindManySendersUseCase(senderRepository);

  const findSenderByClientUidUseCase: FindSenderByClientUidUseCase =
    new FindSenderByClientUidUseCase(senderRepository);

  const changeSenderValidatedUseCase: ChangeSenderValidatedUseCase =
    new ChangeSenderValidatedUseCase(senderRepository);

  const patchSenderUseCase: PatchSenderUseCase = new PatchSenderUseCase(
    senderRepository,
  );

  beforeEach(async () => {
    senderService = new SenderService(
      createSenderUseCase,
      deleteSenderUseCase,
      findAllSendersUseCase,
      findManySendersUseCase,
      findSenderByClientUidUseCase,
      changeSenderValidatedUseCase,
      patchSenderUseCase,
    );

    senderController = new SenderController(senderService);
  });

  describe('create sender', () => {
    const createInputMock: CreateSenderInputDto = {
      name: 'Example',
      email: 'example@domain.com',
      service: 'SendGrid',
      senderApiKey: 'SG.1234567890',
      clientUid: '370268e9-1612-4c37-8d60-15fbdeae3659',
    };

    const createOutputMock: DefaultSenderDto = {
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

    it('should create a sender', async () => {
      jest
        .spyOn(senderService, 'createSender')
        .mockResolvedValueOnce(createOutputMock);

      const result = await senderController.createSender(createInputMock);

      expect(result).toEqual(createOutputMock);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest.spyOn(senderService, 'createSender').mockRejectedValue(error);

      await expect(
        senderController.createSender(createInputMock),
      ).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('delete sender', () => {
    const inputMock = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should delete a sender', async () => {
      jest.spyOn(senderService, 'deleteSender').mockResolvedValueOnce(null);

      const result = await senderController.deleteSender(inputMock);

      expect(result).toEqual(null);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest.spyOn(senderService, 'deleteSender').mockRejectedValue(error);

      await expect(senderController.deleteSender(inputMock)).rejects.toThrow(
        error,
      );
      expect.assertions(1);
    });
  });

  describe('find all senders', () => {
    const outputMock: DefaultSenderDto = {
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

    it('should find all senders', async () => {
      jest
        .spyOn(senderService, 'findAllSenders')
        .mockResolvedValueOnce([outputMock]);

      const result = await senderController.findAllSenders();

      expect(result).toEqual([outputMock]);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest.spyOn(senderService, 'findAllSenders').mockRejectedValue(error);

      await expect(senderController.findAllSenders()).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('find many senders', () => {
    const entityMock: DefaultSenderDto = {
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

    const inputMock: FindManyInputDto = {
      pagination: {
        page: 1,
        limit: 10,
      },
      data: {
        name: 'Example',
      },
    };

    const outputMock: FindManyOutputDto = {
      entities: [entityMock],
      total: 1,
    };

    it('should find many senders', async () => {
      jest
        .spyOn(senderService, 'findManySenders')
        .mockResolvedValueOnce(outputMock);

      const result = await senderController.findManySenders(inputMock);

      expect(result).toEqual(outputMock);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest.spyOn(senderService, 'findManySenders').mockRejectedValue(error);

      await expect(senderController.findManySenders(inputMock)).rejects.toThrow(
        error,
      );
      expect.assertions(1);
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

    const inputMock = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should find a sender by client uid', async () => {
      jest
        .spyOn(senderService, 'findSenderByClientUid')
        .mockResolvedValueOnce(senderMock);

      const result = await senderController.findSenderByClientUid(inputMock);

      expect(result).toEqual(senderMock);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest
        .spyOn(senderService, 'findSenderByClientUid')
        .mockRejectedValue(error);

      await expect(
        senderController.findSenderByClientUid(inputMock),
      ).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('change sender validated', () => {
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

    const inputMock: Partial<DefaultSenderDto> = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      validated: true,
    };

    it('should change sender validated', async () => {
      senderMock.validated = inputMock.validated;

      jest
        .spyOn(senderService, 'changeSenderValidated')
        .mockResolvedValueOnce(senderMock);

      const result = await senderController.changeSenderValidation(
        inputMock.uid,
        { validated: inputMock.validated },
      );

      expect(result).toEqual(senderMock);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest
        .spyOn(senderService, 'changeSenderValidated')
        .mockRejectedValue(error);

      await expect(
        senderController.changeSenderValidation(inputMock.uid, {
          validated: inputMock.validated,
        }),
      ).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('patch sender', () => {
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

    const inputMock: Partial<DefaultSenderDto> = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      name: 'Example',
    };

    it('should patch a sender', async () => {
      jest
        .spyOn(senderService, 'patchSender')
        .mockResolvedValueOnce(senderMock);

      const result = await senderController.patchSender(
        inputMock.uid,
        inputMock,
      );

      expect(result).toEqual(senderMock);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');

      jest.spyOn(senderService, 'patchSender').mockRejectedValue(error);

      await expect(
        senderController.patchSender(inputMock.uid, inputMock),
      ).rejects.toThrow(error);
      expect.assertions(1);
    });
  });
});
