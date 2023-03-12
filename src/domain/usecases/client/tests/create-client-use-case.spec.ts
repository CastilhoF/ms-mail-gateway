import { mock, MockProxy } from 'jest-mock-extended';
import CreateClientUseCase from '../create-client.use-case';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import DomainException from '../../../entities/shared/exceptions/domain.exception';
import { CreateClientInputDto } from '../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../dtos/create-client-output.dto';
import ApiKeyGeneratorInterface from '../../../../app/shared/interfaces/api-key-generator.interface';
import ApiSecretHasherInterface from '../../../../app/shared/interfaces/api-secret-hasher.interface';
import UidGeneratorInterface from '../../../../app/shared/interfaces/uid-generator.interface';

describe('Create Client Use Case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;
  let apiKeyGenerator: MockProxy<ApiKeyGeneratorInterface> | null = null;
  let apiSecretHasher: MockProxy<ApiSecretHasherInterface> | null = null;
  let uidGenerator: MockProxy<UidGeneratorInterface> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
    uidGenerator = mock<UidGeneratorInterface>();
    apiKeyGenerator = mock<ApiKeyGeneratorInterface>();
    apiSecretHasher = mock<ApiSecretHasherInterface>();
  });

  describe('when creating a valid client', () => {
    it('should create the client and return the output DTO', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock: ClientEntity = new ClientEntity(
        clientId,
        input.host,
        input.client,
        apiKeyHash,
        apiSecretHash,
        createdAt,
        updatedAt,
      );

      const saveClientMock =
        clientRepository.save.mockResolvedValueOnce(clientMock);

      const useCase = new CreateClientUseCase(
        clientRepository,
        apiKeyGenerator,
        apiSecretHasher,
        uidGenerator,
      );

      const resultExpect: CreateClientOutputDto = await useCase.execute(input);

      const output: CreateClientOutputDto = {
        id: clientId,
        host: input.host,
        client: input.client,
        apiKey: apiKeyHash,
        apiSecret: apiSecretHash,
        createdAt,
        updatedAt,
      };

      expect(saveClientMock).toBeCalled();
      expect(resultExpect).toStrictEqual(output);

      expect.assertions(2);
    });
  });

  describe('when creating a invalid client', () => {
    it('should create the client and return error - host null - host is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: null,
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('Host is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - host undefined - host is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: undefined,
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('Host is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - client null - Client is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: null,
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('Client is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - client undefined - Client is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: undefined,
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('Client is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - apiSecret null - apiSecret is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = null;

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: null,
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('apiSecret is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - apiSecret undefined - apiSecret is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = undefined;

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: undefined,
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('apiSecret is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - apiKey null - apiKey is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = null;
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('apiKey is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - apiKey undefined - apiKey is required', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = undefined;
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('apiKey is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - createdAt null - createdAt is required', async () => {
      const createdAt = null;
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('createdAt is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - createdAt undefined - createdAt is required', async () => {
      const createdAt = undefined;
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('createdAt is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - updatedAt null - updatedAt is required', async () => {
      const createdAt = new Date();
      const updatedAt = null;
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('updatedAt is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });

    it('should create the client and return error - updatedAt undefined - updatedAt is required', async () => {
      const createdAt = new Date();
      const updatedAt = undefined;
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const input: CreateClientInputDto = {
        host: 'www.test.com.br',
        client: 'test',
        apiSecret: 'P@ssw0rd',
      };

      uidGenerator.generate.mockResolvedValue(clientId);
      apiKeyGenerator.hash.mockResolvedValue(apiKeyHash);
      apiSecretHasher.hash.mockResolvedValue(apiSecretHash);

      const clientMock = () =>
        new ClientEntity(
          clientId,
          input.host,
          input.client,
          apiKeyHash,
          apiSecretHash,
          createdAt,
          updatedAt,
        );

      const exception = new DomainException('updatedAt is required');

      expect(() => clientMock()).toThrowError(exception);

      expect.assertions(1);
    });
  });
});
