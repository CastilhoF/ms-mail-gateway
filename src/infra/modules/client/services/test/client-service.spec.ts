import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientInputDto } from '../../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../../dtos/create-client-output.dto';
import { DefaultClientDto } from '../../dtos/default-client.dto';
import { FindManyInputDto } from '../../dtos/find-many-input.dto';
import { FindManyOutputDto } from '../../dtos/find-many-output.dto';
import ClientService from '../client.service';

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
  });

  describe('client service', () => {
    it('should be defined', () => {
      expect(clientService).toBeDefined();
    });
  });

  describe('create-client', () => {
    it('should return a client', async () => {
      const inputMock: CreateClientInputDto = {
        host: 'https://example.com',
        client: 'Example',
        apiSecret: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
      };

      const outputMock: CreateClientOutputDto = {
        uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        host: 'https://example.com',
        client: 'Example',
        apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
        apiSecret:
          '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
        createdAt: new Date('2023-03-29T11:10:49.769Z'),
        updatedAt: new Date('2023-03-29T11:10:49.769Z'),
      };

      jest.spyOn(clientService, 'createClient').mockResolvedValue(outputMock);

      expect(await clientService.createClient(inputMock)).toEqual(outputMock);
    });
  });

  describe('delete client', () => {
    const input = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should return a client', async () => {
      jest.spyOn(clientService, 'deleteClient').mockResolvedValue();

      expect(await clientService.deleteClient(input)).toBeUndefined();
    });
  });

  describe('find all clients', () => {
    const outputMock: CreateClientOutputDto[] = [
      {
        uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
        host: 'https://example.com',
        client: 'Example',
        apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
        apiSecret:
          '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
        createdAt: new Date('2023-03-29T11:10:49.769Z'),
        updatedAt: new Date('2023-03-29T11:10:49.769Z'),
      },
    ];

    it('should return a client', async () => {
      jest.spyOn(clientService, 'findAllClients').mockResolvedValue(outputMock);

      expect(await clientService.findAllClients()).toEqual(outputMock);
    });
  });

  describe('find many clients', () => {
    const output: FindManyOutputDto = {
      entities: [
        {
          uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
          host: 'https://example.com',
          client: 'Example',
          apiKey:
            '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
          apiSecret:
            '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
          createdAt: new Date('2023-03-29T11:10:49.769Z'),
          updatedAt: new Date('2023-03-29T11:10:49.769Z'),
        },
      ],
      total: 1,
    };

    const input: FindManyInputDto = {
      pagination: { page: 1, limit: 10 },
      data: { host: 'https://example.com' },
    };

    it('should return a client', async () => {
      jest.spyOn(clientService, 'findManyClients').mockResolvedValue(output);

      expect(await clientService.findManyClients(input)).toEqual(output);
    });
  });

  describe('find one client by client', () => {
    const input = 'Example';

    const outputMock: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should return a client', async () => {
      jest
        .spyOn(clientService, 'findOneClientByClient')
        .mockResolvedValue(outputMock);

      expect(await clientService.findOneClientByClient(input)).toEqual(
        outputMock,
      );
    });
  });

  describe('find one client by uid', () => {
    const input = '370268e9-1612-4c37-8d60-15fbdeae3659';

    const outputMock: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should return a client', async () => {
      jest
        .spyOn(clientService, 'findOneClientByUid')
        .mockResolvedValue(outputMock);

      expect(await clientService.findOneClientByUid(input)).toEqual(outputMock);
    });
  });

  describe('find one client by host', () => {
    const input = 'https://example.com';

    const outputMock: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should return a client', async () => {
      jest
        .spyOn(clientService, 'findOneClientByHost')
        .mockResolvedValue(outputMock);

      expect(await clientService.findOneClientByHost(input)).toEqual(
        outputMock,
      );
    });
  });

  describe('patch client', () => {
    const input: Partial<DefaultClientDto> = { host: 'https://example.com.br' };

    const outputMock: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com.br',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should return a client', async () => {
      jest.spyOn(clientService, 'patchClient').mockResolvedValue(outputMock);

      expect(await clientService.patchClient(input)).toEqual(outputMock);
    });
  });
});
