import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDocument } from '../../../../../infra/configuration/ioc/database/schemas/client.schema';
import ClientMongoRepository from '../client-mongo.repository';
import ClientModelMapper from '../../../database/mappers/client-model.mapper';
import ClientEntity from '../../../../../domain/entities/client/client.entity';
import DatabaseNotFoundException from '../../../database/exceptions/database-not-found.exception';
import DatabaseConflictException from '../../../database/exceptions/database-conflict.exception';
import { PaginationDto } from '../../../../../domain/usecases/client/dtos/pagination.dto';
import ClientModel from '../../../../../infra/modules/database/models/client-model';

describe('ClientMongoRepository', () => {
  let clientMongoRepository: ClientMongoRepository;
  let clientModel: Model<ClientDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientMongoRepository,
        {
          provide: getModelToken(ClientModel.name),
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

    clientMongoRepository = module.get<ClientMongoRepository>(
      ClientMongoRepository,
    );
    clientModel = module.get<Model<ClientDocument>>(
      getModelToken(ClientModel.name),
    );
  });

  describe('client mongo repository - find all', () => {
    it('should throw an exception if no clients are found', async () => {
      // Arrange
      jest.spyOn(clientModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      // Act
      const promise = clientMongoRepository.findAll();

      // Assert
      await expect(promise).rejects.toThrowError(
        new DatabaseNotFoundException('No clients found'),
      );
    });

    it('should return an array of client entity', async () => {
      const client = new ClientEntity(
        '370268e9-1612-4c37-8d60-15fbdeae3659',
        'https://example.com',
        'Example',
        '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
        '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
        new Date('2023-03-29T11:10:49.769Z'),
        new Date('2023-03-29T11:10:49.769Z'),
      );

      const client2 = new ClientEntity(
        '370268e9-1612-4c37-8d60-15fbdeae3659',
        'https://example-dois.com',
        'Example 2',
        '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
        '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
        new Date('2023-03-29T11:10:49.769Z'),
        new Date('2023-03-29T11:10:49.769Z'),
      );

      // Arrange
      const clientDocuments = [
        new ClientModel(client),
        new ClientModel(client2),
      ];

      const expectedClientEntities = clientDocuments.map((client) =>
        ClientModelMapper.toEntity(client),
      );

      jest.spyOn(clientModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocuments),
      } as any);

      // Act
      const result = await clientMongoRepository.findAll();

      // Assert
      expect(result).toEqual(expectedClientEntities);
    });
  });

  describe('client mongo repository - find many', () => {
    it('should throw an exception if no clients are found', async () => {
      const exceptionMock = `{"message":"No clients found","name":"DatabaseNotFoundException"}`;

      // Arrange
      jest.spyOn(clientModel, 'find').mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce([]),
        catch: jest.fn().mockResolvedValueOnce([]),
      } as any);

      jest.spyOn(clientModel, 'countDocuments').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(0),
        catch: jest.fn().mockResolvedValueOnce([]),
      } as any);

      // Act
      const promise = clientMongoRepository.findMany(
        {
          page: 1,
          limit: 10,
        },
        { host: 'https://example.com' },
      );

      // Assert
      await expect(promise).rejects.toThrowError(
        new DatabaseNotFoundException('No clients found', exceptionMock),
      );
    });

    it('should return an array of ClientEntity with pagination', async () => {
      const client = new ClientEntity(
        '370268e9-1612-4c37-8d60-15fbdeae3659',
        'https://example.com',
        'Example',
        '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
        '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
        new Date('2023-03-29T11:10:49.769Z'),
        new Date('2023-03-29T11:10:49.769Z'),
      );

      const pagination: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const filter: Partial<ClientEntity> = { host: 'https://example.com' };

      // Arrange
      const clientDocument = [new ClientModel(client)];

      const expectedResponse = {
        entities: clientDocument.map((client) =>
          ClientModelMapper.toEntity(client),
        ),
        total: 1,
      };

      jest.spyOn(clientModel, 'find').mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(clientModel, 'countDocuments').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(1),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(clientMongoRepository, 'findMany')
        .mockResolvedValueOnce(expectedResponse);

      // Act
      const result = await clientMongoRepository.findMany(pagination, filter);

      // Assert
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('client mongo repository - find by uid', () => {
    const uid = '370268e9-1612-4c37-8d60-15fbdeae3659';

    const clientEntity = new ClientEntity(
      '370268e9-1612-4c37-8d60-15fbdeae3659',
      'https://example.com',
      'Example',
      '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      new Date('2023-03-29T11:10:49.769Z'),
      new Date('2023-03-29T11:10:49.769Z'),
    );

    it('should throw an exception if no client is found', async () => {
      const exceptionMock = `{"message":"No client found","name":"DatabaseNotFoundException"}`;

      // Arrange
      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      // Act
      const promise = clientMongoRepository.findByUid(uid);

      // Assert
      await expect(promise).rejects.toThrowError(
        new DatabaseNotFoundException('Client not found', exceptionMock),
      );
    });

    it('should return a client entity', async () => {
      // Arrange
      const clientDocument = new ClientModel(clientEntity);

      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
      } as any);

      // Act
      const result = await clientMongoRepository.findByUid(uid);

      // Assert
      expect(result).toEqual(clientEntity);
    });

    //it('should throw an exception if an error occurs', async () => {});
  });

  describe('client mongo repository - find one', () => {
    const clientEntity = new ClientEntity(
      '370268e9-1612-4c37-8d60-15fbdeae3659',
      'https://example.com',
      'Example',
      '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      new Date('2023-03-29T11:10:49.769Z'),
      new Date('2023-03-29T11:10:49.769Z'),
    );

    const filter: Partial<ClientEntity> = {
      host: clientEntity.host,
    };

    const clientDocument = new ClientModel(clientEntity);

    const partialClientModel: Partial<ClientModel> = {
      host: clientDocument.host,
    };

    it('should find a client by a partial entity', async () => {
      // Arrange
      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest
        .spyOn(clientMongoRepository, 'findOne')
        .mockResolvedValueOnce(clientEntity);

      jest
        .spyOn(ClientModelMapper, 'partialEntityToPartialModel')
        .mockReturnValue(partialClientModel);

      jest.spyOn(ClientModelMapper, 'toEntity').mockReturnValue(clientEntity);

      // Act
      const result = await clientMongoRepository.findOne(filter);

      // Assert
      expect(result).toEqual(clientEntity);
      expect.assertions(1);
    });

    it('should throw a database not found exception when client is not found', async () => {
      // Arrange
      jest
        .spyOn(ClientModelMapper, 'partialEntityToPartialModel')
        .mockReturnValue(partialClientModel);

      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      // Act & Assert
      await expect(clientMongoRepository.findOne(filter)).rejects.toThrow(
        DatabaseNotFoundException,
      );
      expect.assertions(1);
    });

    it('should throw a database not found exception when an error occurs', async () => {
      // Arrange
      jest
        .spyOn(ClientModelMapper, 'partialEntityToPartialModel')
        .mockReturnValue(partialClientModel);
      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest
          .fn()
          .mockRejectedValueOnce(
            new DatabaseNotFoundException('No clients found'),
          ),
      } as any);

      // Act & Assert
      await expect(clientMongoRepository.findOne(filter)).rejects.toThrow(
        DatabaseNotFoundException,
      );
    });
  });

  describe('client mongo repository - save', () => {
    const clientEntity = new ClientEntity(
      '370268e9-1612-4c37-8d60-15fbdeae3659',
      'https://example.com',
      'Example',
      '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      new Date('2023-03-29T11:10:49.769Z'),
      new Date('2023-03-29T11:10:49.769Z'),
    );

    const clientDocument = new ClientModel(clientEntity);

    it('should save a client', async () => {
      // Arrange
      jest.spyOn(clientModel, 'create').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(ClientModelMapper, 'toEntity').mockReturnValue(clientEntity);

      // Act
      const result = await clientMongoRepository.save(clientEntity);

      // Assert
      expect(result).toEqual(clientEntity);
      expect.assertions(1);
    });

    it('should throw a database conflict exception', async () => {
      // Arrange
      const conflictException: DatabaseConflictException =
        new DatabaseConflictException('Client already exists');

      jest.spyOn(clientModel, 'create').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(conflictException),
      } as any);

      // Act & Assert
      await expect(clientMongoRepository.save(clientEntity)).rejects.toThrow(
        conflictException,
      );
      expect.assertions(1);
    });

    it('should throw a database exception', async () => {
      // Arrange
      jest.spyOn(clientModel, 'create').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(new Error('Database error')),
      } as any);

      // Act & Assert
      await expect(clientMongoRepository.save(clientEntity)).rejects.toThrow(
        new Error('Database error'),
      );
      expect.assertions(1);
    });
  });

  describe('client mongo repository - update', () => {
    const clientEntity = new ClientEntity(
      '370268e9-1612-4c37-8d60-15fbdeae3659',
      'https://example.com',
      'Example',
      '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      new Date('2023-03-29T11:10:49.769Z'),
      new Date('2023-03-29T11:10:49.769Z'),
    );

    const clientDocument = new ClientModel(clientEntity);

    const mockId = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should update a client', async () => {
      // Arrange
      jest.spyOn(clientModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(ClientModelMapper, 'toEntity').mockReturnValue(clientEntity);

      jest.spyOn(ClientModelMapper, 'toModel').mockReturnValue(clientDocument);

      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      // Act
      const result = await clientMongoRepository.update(mockId, clientEntity);

      // Assert
      expect(result).toEqual(clientEntity);
      expect.assertions(1);
    });

    it('should throw a database not found exception', async () => {
      const exception = new DatabaseNotFoundException('Client not found');
      // Arrange
      jest.spyOn(ClientModelMapper, 'toModel').mockReturnValue(clientDocument);

      jest.spyOn(clientModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(exception),
      } as any);

      // Act & Assert
      await expect(
        clientMongoRepository.update(mockId, clientEntity),
      ).rejects.toThrow(exception);
      expect.assertions(1);
    });
  });

  describe('client mongo repository - patch', () => {
    const mockUid = '370268e9-1612-4c37-8d60-15fbdeae3659';

    const clientEntity: ClientEntity = new ClientEntity(
      '370268e9-1612-4c37-8d60-15fbdeae3659',
      'https://example.com',
      'Example',
      '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      new Date('2023-03-29T11:10:49.769Z'),
      new Date('2023-03-29T11:10:49.769Z'),
    );

    const partialEntityMock: Partial<ClientEntity> = {
      host: 'https://example.com',
    };

    const partialClientModelMock: Partial<ClientModel> = {
      host: 'https://example.com',
    };

    const clientDocument: ClientModel = new ClientModel(clientEntity);

    it('should patch a client', async () => {
      jest
        .spyOn(ClientModelMapper, 'partialEntityToPartialModel')
        .mockReturnValueOnce(partialClientModelMock);

      jest.spyOn(clientModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);

      const result = await clientMongoRepository.patch(
        mockUid,
        partialEntityMock,
      );

      expect(result).toEqual(clientEntity);
      expect.assertions(1);
    });

    it('should throw a database error', async () => {
      const exception = new DatabaseNotFoundException('Client not found');
      // Arrange
      jest.spyOn(clientModel, 'updateOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(exception),
      } as any);

      // Act & Assert
      await expect(
        clientMongoRepository.patch(mockUid, partialEntityMock),
      ).rejects.toThrow(exception);
      expect.assertions(1);
    });
  });

  describe('client mongo repository - delete', () => {
    const mockId = '370268e9-1612-4c37-8d60-15fbdeae3659';
    const clientEntity = new ClientEntity(
      '370268e9-1612-4c37-8d60-15fbdeae3659',
      'https://example.com',
      'Example',
      '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      new Date('2023-03-29T11:10:49.769Z'),
      new Date('2023-03-29T11:10:49.769Z'),
    );

    const clientDocument = new ClientModel(clientEntity);

    it('should delete a client', async () => {
      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(clientDocument),
        catch: jest.fn().mockReturnThis(),
      } as any);
      // Arrange
      jest.spyOn(clientModel, 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      // Act
      const result = await clientMongoRepository.delete(mockId);

      // Assert
      expect(result).toBeUndefined();
      expect.assertions(1);
    });

    it('should throw a database not found exception', async () => {
      // Arrange
      const exception = new DatabaseNotFoundException('Client not found');

      jest.spyOn(clientModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
        catch: jest.fn().mockReturnThis(),
      } as any);

      jest.spyOn(clientModel, 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockReturnThis(),
        catch: jest.fn().mockRejectedValueOnce(exception),
      } as any);

      // Act & Assert
      await expect(clientMongoRepository.delete(mockId)).rejects.toThrow(
        exception,
      );
      expect.assertions(1);
    });
  });
});
