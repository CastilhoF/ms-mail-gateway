import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SenderDocument } from '../../../../../infra/configuration/ioc/database/schemas/sender.schema';
import SenderMongoRepository from '../sender-mongo.repository';
import SenderModelMapper from '../../../../../infra/modules/database/mappers/sender-model.mapper';
import SenderEntity from '../../../../../domain/entities/sender/sender.entity';
import SenderModel from '../../../../../infra/modules/database/models/sender-model';
import { PaginationDto } from '../../../../../domain/usecases/sender/dtos/pagination.dto';
import DatabaseConflictException from '../../../../../infra/modules/database/exceptions/database-conflict.exception';
import DatabaseNotFoundException from '../../../../../infra/modules/database/exceptions/database-not-found.exception';

describe('SenderMongoRepository', () => {
  let senderMongoRepository: SenderMongoRepository;
  let senderModel: Model<SenderDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SenderMongoRepository,
        {
          provide: getModelToken(SenderModel.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            countDocuments: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    senderMongoRepository = module.get<SenderMongoRepository>(
      SenderMongoRepository,
    );
    senderModel = module.get<Model<SenderDocument>>(
      getModelToken(SenderModel.name),
    );
  });

  describe('sender mongo repository - find all', () => {
    it('should return an array of senders', async () => {
      const senderMock = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'sender',
        'test@domain.com',
        'sendgrid',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        true,
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const senderTwoMock = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'sender2',
        'test2@domain.com',
        'sendgrid',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        true,
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const senderDocuments = [
        new SenderModel(senderMock),
        new SenderModel(senderTwoMock),
      ];

      const expectedSenderEntities = senderDocuments.map((senderDocument) =>
        SenderModelMapper.toEntity(senderDocument),
      );

      jest.spyOn(senderModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocuments),
      } as any);

      const result = await senderMongoRepository.findAll();

      expect(result).toEqual(expectedSenderEntities);
    });

    it('should throw an exception if sender not found', async () => {
      jest.spyOn(senderModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await expect(senderMongoRepository.findAll()).rejects.toThrow(
        DatabaseNotFoundException,
      );
    });
  });

  describe('sender mongo repository - find many', () => {
    it('should return an array of SenderEntity with pagination', async () => {
      const senderMock = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'sender',
        'test@domain.com',
        'sendgrid',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        true,
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const pagination: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const filter: Partial<SenderEntity> = { name: 'sender' };

      const senderDocuments = [new SenderModel(senderMock)];

      const expectedResponse = {
        entities: senderDocuments.map((senderDocument) =>
          SenderModelMapper.toEntity(senderDocument),
        ),
        total: 1,
      };

      jest.spyOn(senderModel, 'find').mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(senderDocuments),
        catch: jest.fn().mockResolvedValueOnce([]),
      } as any);

      jest.spyOn(senderModel, 'countDocuments').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(1),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(senderMongoRepository, 'findMany')
        .mockResolvedValueOnce(expectedResponse);

      const result = await senderMongoRepository.findMany(pagination, filter);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw an exception if no senders are found', async () => {
      const exceptionMock = `"message":"No senders found", "name":"DatabaseNotFoundException"`;

      jest.spyOn(senderModel, 'find').mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce([]),
        catch: jest.fn().mockResolvedValueOnce([]),
      } as any);

      jest.spyOn(senderModel, 'countDocuments').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(0),
        catch: jest.fn().mockResolvedValueOnce([]),
      } as any);

      const promise = senderMongoRepository.findMany(
        {
          page: 1,
          limit: 10,
        },
        { name: 'sender' },
      );

      await expect(promise).rejects.toThrowError(
        new DatabaseNotFoundException('No senders found', exceptionMock),
      );
    });
  });

  describe('sender mongo repository - find by uid', () => {
    const uid = '370268e9-1612-4c37-8d60-15fbdeae3659';

    const senderMock = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );
    it('should return a sender entity', async () => {
      const senderDocument = new SenderModel(senderMock);

      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
      } as any);

      const result = await senderMongoRepository.findByUid(uid);

      expect(result).toEqual(senderMock);
    });

    it('should throw an exception if no senders found', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(senderMongoRepository.findByUid(uid)).rejects.toThrow(
        DatabaseNotFoundException,
      );
    });
  });

  describe('sender mongo repository - find one', () => {
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const filter: Partial<SenderEntity> = { name: 'sender' };

    const senderDocument = new SenderModel(senderEntity);

    const partialSenderModel: Partial<SenderModel> = {
      name: senderDocument.name,
    };

    it('should return a sender entity', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(senderMongoRepository, 'findOne')
        .mockResolvedValueOnce(senderEntity);

      jest
        .spyOn(SenderModelMapper, 'partialEntityToPartialModel')
        .mockReturnValueOnce(partialSenderModel);

      jest
        .spyOn(SenderModelMapper, 'toEntity')
        .mockReturnValueOnce(senderEntity);

      const result = await senderMongoRepository.findOne(filter);

      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw an exception if no senders found', async () => {
      jest
        .spyOn(SenderModelMapper, 'partialEntityToPartialModel')
        .mockReturnValue(partialSenderModel);

      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      await expect(senderMongoRepository.findOne(filter)).rejects.toThrow(
        DatabaseNotFoundException,
      );

      expect.assertions(1);
    });
  });

  describe('sender mongo repository - find by email', () => {
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const email = senderEntity.email;

    const senderDocument = new SenderModel(senderEntity);

    it('should find a sender by email', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(senderMongoRepository, 'findOneByEmail')
        .mockResolvedValueOnce(senderEntity);

      jest
        .spyOn(SenderModelMapper, 'toEntity')
        .mockReturnValueOnce(senderEntity);

      const result = await senderMongoRepository.findOneByEmail(email);

      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw an exception if no senders found', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      await expect(senderMongoRepository.findOneByEmail(email)).rejects.toThrow(
        DatabaseNotFoundException,
      );

      expect.assertions(1);
    });
  });

  describe('sender mongo repository - find by name', () => {
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const name = senderEntity.name;

    const senderDocument = new SenderModel(senderEntity);

    it('should find a sender by name', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(senderMongoRepository, 'findOneByName')
        .mockResolvedValueOnce(senderEntity);

      jest
        .spyOn(SenderModelMapper, 'toEntity')
        .mockReturnValueOnce(senderEntity);

      const result = await senderMongoRepository.findOneByName(name);

      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw an exception if no senders found', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      await expect(senderMongoRepository.findOneByEmail(name)).rejects.toThrow(
        DatabaseNotFoundException,
      );

      expect.assertions(1);
    });
  });

  describe('sender mongo repository - find by client uid', () => {
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const clientUid = senderEntity.clientUid;

    const senderDocument = new SenderModel(senderEntity);

    it('should find a sender by client uid', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(senderMongoRepository, 'findOneByClientUid')
        .mockResolvedValueOnce(senderEntity);

      jest
        .spyOn(SenderModelMapper, 'toEntity')
        .mockReturnValueOnce(senderEntity);

      const result = await senderMongoRepository.findOneByClientUid(clientUid);

      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw an exception if no senders found', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      await expect(
        senderMongoRepository.findOneByEmail(clientUid),
      ).rejects.toThrow(DatabaseNotFoundException);

      expect.assertions(1);
    });
  });

  describe('sender mongo repository - save', () => {
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const senderDocument = new SenderModel(senderEntity);

    it('should save a sender', async () => {
      // Arrange
      jest.spyOn(senderModel, 'create').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(SenderModelMapper, 'toEntity').mockReturnValue(senderEntity);

      // Act
      const result = await senderMongoRepository.save(senderEntity);

      senderEntity.createdAt = result.createdAt;
      senderEntity.updatedAt = result.updatedAt;

      // Assert
      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw a database conflict exception', async () => {
      // Arrange
      const conflictException: DatabaseConflictException =
        new DatabaseConflictException('Sender already exists');

      jest.spyOn(senderModel, 'create').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(conflictException),
      } as any);

      // Act & Assert
      await expect(senderMongoRepository.save(senderEntity)).rejects.toThrow(
        conflictException,
      );
      expect.assertions(1);
    });

    it('should throw a database exception', async () => {
      // Arrange
      jest.spyOn(senderModel, 'create').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(new Error('Database error')),
      } as any);

      // Act & Assert
      await expect(senderMongoRepository.save(senderEntity)).rejects.toThrow(
        new Error('Database error'),
      );
      expect.assertions(1);
    });
  });

  describe('sender mongo repository - update', () => {
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const senderDocument = new SenderModel(senderEntity);

    const mockId = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should update a sender', async () => {
      // Arrange
      jest.spyOn(senderModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(SenderModelMapper, 'toEntity').mockReturnValue(senderEntity);

      jest.spyOn(SenderModelMapper, 'toModel').mockReturnValue(senderDocument);

      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      // Act
      const result = await senderMongoRepository.update(mockId, senderEntity);

      senderEntity.createdAt = result.createdAt;
      senderEntity.updatedAt = result.updatedAt;

      // Assert
      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw a database not found exception', async () => {
      const exception = new DatabaseNotFoundException('Sender not found');
      // Arrange
      jest.spyOn(SenderModelMapper, 'toModel').mockReturnValue(senderDocument);

      jest.spyOn(senderModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(exception),
      } as any);

      // Act & Assert
      await expect(
        senderMongoRepository.update(mockId, senderEntity),
      ).rejects.toThrow(exception);
      expect.assertions(1);
    });
  });

  describe('sender mongo repository - patch', () => {
    const mockUid = '370268e9-1612-4c37-8d60-15fbdeae3659';

    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const partialEntityMock: Partial<SenderEntity> = {
      name: 'sender',
    };

    const partialSenderModelMock: Partial<SenderEntity> = {
      name: 'sender',
    };

    const senderDocument: SenderModel = new SenderModel(senderEntity);

    it('should patch a sender', async () => {
      jest
        .spyOn(SenderModelMapper, 'partialEntityToPartialModel')
        .mockReturnValueOnce(partialSenderModelMock);

      jest.spyOn(senderModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      const result = await senderMongoRepository.patch(
        mockUid,
        partialEntityMock,
      );

      senderEntity.createdAt = result.createdAt;
      senderEntity.updatedAt = result.updatedAt;

      expect(result).toEqual(senderEntity);
      expect.assertions(1);
    });

    it('should throw a database error', async () => {
      const exception = new DatabaseNotFoundException('Sender not found');
      // Arrange
      jest.spyOn(senderModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(exception),
      } as any);

      // Act & Assert
      await expect(
        senderMongoRepository.patch(mockUid, partialEntityMock),
      ).rejects.toThrow(exception);
      expect.assertions(1);
    });
  });

  describe('sender mongo repository - delete', () => {
    const mockId = '370268e9-1612-4c37-8d60-15fbdeae3659';
    const senderEntity = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'sender',
      'test@domain.com',
      'sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      true,
      '0d1eb304-4359-4507-817d-398bef7f7c3d',
      new Date(),
      new Date(),
    );

    const senderDocument = new SenderModel(senderEntity);

    it('should delete a sender', async () => {
      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(senderDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);
      // Arrange
      jest.spyOn(senderModel, 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      // Act
      const result = await senderMongoRepository.delete(mockId);

      // Assert
      expect(result).toBeUndefined();
      expect.assertions(1);
    });

    it('should throw a database not found exception', async () => {
      // Arrange
      const exception = new DatabaseNotFoundException('Sender not found');

      jest.spyOn(senderModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(senderModel, 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(exception),
      } as any);

      // Act & Assert
      await expect(senderMongoRepository.delete(mockId)).rejects.toThrow(
        exception,
      );
      expect.assertions(1);
    });
  });
});
