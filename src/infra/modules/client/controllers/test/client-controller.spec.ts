import { CreateClientInputDto } from '../../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../../dtos/create-client-output.dto';
import ClientController from '../client.controller';
import ClientService from '../../services/client.service';
import CreateClientUseCase from '../../../../../domain/usecases/client/create-client.use-case';
import ApiKeyGeneratorInterface from '../../../../../app/shared/interfaces/api-key-generator.interface';
import ApiSecretHasherInterface from '../../../../../app/shared/interfaces/api-secret-hasher.interface';
import UidGeneratorInterface from '../../../../../app/shared/interfaces/uid-generator.interface';
import FindAllClientsUseCase from '../../../../../domain/usecases/client/find-all-clients.use-case';
import FindManyClientsUseCase from '../../../../../domain/usecases/client/find-many-clients.use-case';
import FindOneClientByClientUseCase from '../../../../../domain/usecases/client/find-one-client-by-client.use-case';
import FindOneClientByHostUseCase from '../../../../../domain/usecases/client/find-one-client-by-host.use-case';
import FindOneClientByUidUseCase from '../../../../../domain/usecases/client/find-one-client-by-uid.use-case';
import PatchClientUseCase from '../../../../../domain/usecases/client/patch-client.use-case';
import DeleteClientUseCase from '../../../../../domain/usecases/client/delete-client.use-case';
import ClientRepository from '../../../../../app/repositories/client/client.repository';
import { DefaultClientDto } from '../../dtos/default-client.dto';
import { FindManyOutputDto } from '../../dtos/find-many-output.dto';
import { FindManyInputDto } from '../../dtos/find-many-input.dto';

describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;
  let apiKeyGenerator: ApiKeyGeneratorInterface;
  let apiSecretHasher: ApiSecretHasherInterface;
  let uidGenerator: UidGeneratorInterface;
  let clientRepository: ClientRepository;
  const createClientUseCase: CreateClientUseCase = new CreateClientUseCase(
    clientRepository,
    apiKeyGenerator,
    apiSecretHasher,
    uidGenerator,
  );
  const findAllClientsUseCase: FindAllClientsUseCase =
    new FindAllClientsUseCase(clientRepository);
  const findManyClientsUseCase: FindManyClientsUseCase =
    new FindManyClientsUseCase(clientRepository);
  const findOneClientByClientUseCase: FindOneClientByClientUseCase =
    new FindOneClientByClientUseCase(clientRepository);
  const findOneClientByHostUseCase: FindOneClientByHostUseCase =
    new FindOneClientByHostUseCase(clientRepository);
  const findOneClientByUidUseCase: FindOneClientByUidUseCase =
    new FindOneClientByUidUseCase(clientRepository);
  const patchClientUseCase: PatchClientUseCase = new PatchClientUseCase(
    clientRepository,
    apiKeyGenerator,
  );
  const deleteClientUseCase: DeleteClientUseCase = new DeleteClientUseCase(
    clientRepository,
  );

  beforeEach(() => {
    clientService = new ClientService(
      createClientUseCase,
      deleteClientUseCase,
      findAllClientsUseCase,
      findManyClientsUseCase,
      findOneClientByClientUseCase,
      findOneClientByUidUseCase,
      findOneClientByHostUseCase,
      patchClientUseCase,
    );
    clientController = new ClientController(clientService);
  });

  describe('create client', () => {
    const createClientInputDto: CreateClientInputDto = {
      host: 'https://example.com',
      client: 'Example',
      apiSecret: '370268e9-1612-4c37-8d60-15fbdeae3659',
    };

    const createClientOutputDto: CreateClientOutputDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should create a client', async () => {
      jest
        .spyOn(clientService, 'createClient')
        .mockResolvedValue(createClientOutputDto);

      const response = await clientController.createClient(
        createClientInputDto,
      );
      expect(clientService.createClient).toBeCalledWith(createClientInputDto);
      expect(response).toEqual(createClientOutputDto);
      expect(response).toHaveProperty('uid');
      expect(response).toHaveProperty('host');
      expect(response).toHaveProperty('client');
      expect(response).toHaveProperty('apiKey');
      expect(response).toHaveProperty('apiSecret');
      expect(response).toHaveProperty('createdAt');
      expect(response).toHaveProperty('updatedAt');
      expect.assertions(9);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'createClient').mockRejectedValue(error);

      await expect(
        clientController.createClient(createClientInputDto),
      ).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('delete a client', () => {
    const uid = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should delete a client', async () => {
      jest.spyOn(clientService, 'deleteClient').mockResolvedValue(null);

      const response = await clientController.deleteClient(uid);
      expect(clientService.deleteClient).toBeCalledWith(uid);
      expect(response).toEqual(null);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'deleteClient').mockRejectedValue(error);

      await expect(clientController.deleteClient(uid)).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('find all clients', () => {
    const client: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const output: DefaultClientDto[] = [client];

    it('should find all clients', async () => {
      jest.spyOn(clientService, 'findAllClients').mockResolvedValue(output);

      const response = await clientController.findAllClients();
      expect(clientService.findAllClients).toBeCalled();
      expect(response).toEqual(output);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'findAllClients').mockRejectedValue(error);

      await expect(clientController.findAllClients()).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('find many clients', () => {
    const client: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const input: FindManyInputDto = {
      pagination: {
        page: 1,
        limit: 10,
      },
      data: { host: client.host },
    };

    const output: FindManyOutputDto = {
      entities: [client],
      total: 1,
    };

    it('should find many clients', async () => {
      jest.spyOn(clientService, 'findManyClients').mockResolvedValue(output);

      const response = await clientController.findManyClients(input);
      expect(clientService.findManyClients).toBeCalledWith(input);
      expect(response).toEqual(output);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'findManyClients').mockRejectedValue(error);

      await expect(clientController.findManyClients(input)).rejects.toThrow(
        error,
      );
      expect.assertions(1);
    });
  });

  describe('find client by client', () => {
    const client: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const clientName = 'Example';

    it('should find client by client', async () => {
      jest
        .spyOn(clientService, 'findOneClientByClient')
        .mockResolvedValue(client);

      const response = await clientController.findOneByClient(clientName);
      expect(clientService.findOneClientByClient).toBeCalledWith(clientName);
      expect(response).toEqual(client);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest
        .spyOn(clientService, 'findOneClientByClient')
        .mockRejectedValue(error);

      await expect(
        clientController.findOneByClient(clientName),
      ).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('find client by host', () => {
    const client: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const input = { host: 'https://example.com' };

    it('should find client by host', async () => {
      jest
        .spyOn(clientService, 'findOneClientByHost')
        .mockResolvedValue(client);

      const response = await clientController.findOneByHost(input);
      expect(clientService.findOneClientByHost).toBeCalledWith(input.host);
      expect(response).toEqual(client);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'findOneClientByHost').mockRejectedValue(error);

      await expect(clientController.findOneByHost(input)).rejects.toThrow(
        error,
      );
      expect.assertions(1);
    });
  });

  describe('find client by uid', () => {
    const client: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const uid = '370268e9-1612-4c37-8d60-15fbdeae3659';

    it('should find client by uid', async () => {
      jest.spyOn(clientService, 'findOneClientByUid').mockResolvedValue(client);

      const response = await clientController.findOneByUid(uid);
      expect(clientService.findOneClientByUid).toBeCalledWith(uid);
      expect(response).toEqual(client);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'findOneClientByUid').mockRejectedValue(error);

      await expect(clientController.findOneByUid(uid)).rejects.toThrow(error);
      expect.assertions(1);
    });
  });

  describe('update client', () => {
    const client: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    const input: Partial<DefaultClientDto> = {
      host: `${client.host}/updated'`,
    };

    const uid = client.uid;

    const clientUpdated: DefaultClientDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com/updated',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    input.uid = uid;

    it('should update client', async () => {
      jest.spyOn(clientService, 'patchClient').mockResolvedValue(clientUpdated);

      const response = await clientController.updateClient(uid, input);
      expect(clientService.patchClient).toBeCalledWith(input);
      expect(response).toEqual(clientUpdated);
      expect.assertions(2);
    });

    it('should throw an error', async () => {
      const error = new Error('Error');
      jest.spyOn(clientService, 'patchClient').mockRejectedValue(error);

      await expect(clientController.updateClient(uid, input)).rejects.toThrow(
        error,
      );
      expect.assertions(1);
    });
  });
});
