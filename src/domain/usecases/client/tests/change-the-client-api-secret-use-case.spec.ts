import { mock, MockProxy } from 'jest-mock-extended';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import { ChangeClientApiSecretInputDto } from '../dtos/change-client-api-secret-input.dto';
import ApiSecretHasherInterface from '../../../../app/shared/interfaces/api-secret-hasher.interface';
import ChangeTheClientApiSecretUseCase from '../change-the-client-api-secret.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import ApiSecretHasherService from '../../../../infra/modules/cryptography/services/api-secret-hasher.service';
import DomainException from '../../../entities/shared/exceptions/domain.exception';

describe('Change the client API secret use case', () => {
  let service: ApiSecretHasherService;
  let clientRepository: MockProxy<ClientRepository> | null = null;
  let apiSecretHasher: MockProxy<ApiSecretHasherInterface> | null = null;

  beforeEach(async () => {
    clientRepository = mock<ClientRepository>();
    apiSecretHasher = mock<ApiSecretHasherInterface>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiSecretHasherService],
    }).compile();

    service = module.get<ApiSecretHasherService>(ApiSecretHasherService);
  });

  describe('When change apiSecret to a new valid apiSecret', () => {
    it('should return the client with the new apiSecret', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const host = 'www.test.com.br';
      const client = 'test';
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKey = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecret = '0d1eb304-4359-4507-817d-398bef7f7c3d';
      const newApiSecret = 'a9e8fbfa-7e8d-4561-b039-8677d819c066';
      const newApiSecretHashed = await service.hash(newApiSecret);

      const input: ChangeClientApiSecretInputDto = {
        uid: clientId,
        apiSecret: newApiSecret,
      };

      const clientMock: ClientEntity = new ClientEntity(
        clientId,
        host,
        client,
        apiKey,
        apiSecret,
        createdAt,
        updatedAt,
      );

      const clientSecretUpdatedMock: ClientEntity = new ClientEntity(
        clientId,
        host,
        client,
        apiKey,
        newApiSecretHashed,
        createdAt,
        updatedAt,
      );

      const useCase = new ChangeTheClientApiSecretUseCase(
        clientRepository,
        apiSecretHasher,
      );

      apiSecretHasher.hash.mockResolvedValue(newApiSecretHashed);
      clientRepository.findById.mockResolvedValue(clientMock);

      const clientSaveMock = clientRepository.save.mockResolvedValueOnce(
        clientSecretUpdatedMock,
      );

      const output = `API Secret successfully changed for client: ${clientId}`;

      const resultExpected: string = await useCase.execute(input);

      expect(clientSaveMock).toBeCalled();
      expect(resultExpected).toStrictEqual(output);
      expect(apiSecretHasher.hash).toBeCalledWith(newApiSecret);
      expect.assertions(3);
    });
  });

  describe('When change apiSecret to a new invalid apiSecret', () => {
    it('should throw an error - uid null', async () => {
      const newApiSecret = 'a9e8fbfa-7e8d-4561-b039-8677d819c066';

      const input: ChangeClientApiSecretInputDto = {
        uid: null,
        apiSecret: newApiSecret,
      };

      const useCase = new ChangeTheClientApiSecretUseCase(
        clientRepository,
        apiSecretHasher,
      );

      const exception = new DomainException('Uid is required.');

      await expect(useCase.execute(input)).rejects.toThrow(exception);

      expect(apiSecretHasher.hash).not.toBeCalled();
      expect.assertions(2);
    });

    it('should throw an error - uid undefined', async () => {
      const newApiSecret = 'a9e8fbfa-7e8d-4561-b039-8677d819c066';

      const input: ChangeClientApiSecretInputDto = {
        uid: undefined,
        apiSecret: newApiSecret,
      };

      const useCase = new ChangeTheClientApiSecretUseCase(
        clientRepository,
        apiSecretHasher,
      );

      const exception = new DomainException('Uid is required.');

      await expect(useCase.execute(input)).rejects.toThrow(exception);

      expect(apiSecretHasher.hash).not.toBeCalled();
      expect.assertions(2);
    });

    it('should throw an error - apiSecret null', async () => {
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';

      const input: ChangeClientApiSecretInputDto = {
        uid: clientId,
        apiSecret: null,
      };

      const useCase = new ChangeTheClientApiSecretUseCase(
        clientRepository,
        apiSecretHasher,
      );

      const exception = new DomainException('API Secret is required.');

      await expect(useCase.execute(input)).rejects.toThrow(exception);

      expect(apiSecretHasher.hash).not.toBeCalled();
      expect.assertions(2);
    });

    it('should throw an error - apiSecret undefined', async () => {
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';

      const input: ChangeClientApiSecretInputDto = {
        uid: clientId,
        apiSecret: undefined,
      };

      const useCase = new ChangeTheClientApiSecretUseCase(
        clientRepository,
        apiSecretHasher,
      );

      const exception = new DomainException('API Secret is required.');

      await expect(useCase.execute(input)).rejects.toThrow(exception);

      expect(apiSecretHasher.hash).not.toBeCalled();
      expect.assertions(2);
    });

    it('should throw an error - client not found', async () => {
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const newApiSecret = 'a9e8fbfa-7e8d-4561-b039-8677d819c066';

      const input: ChangeClientApiSecretInputDto = {
        uid: clientId,
        apiSecret: newApiSecret,
      };

      const useCase = new ChangeTheClientApiSecretUseCase(
        clientRepository,
        apiSecretHasher,
      );

      const exception = new DomainException(`Client not found: ${input.uid}`);

      await expect(useCase.execute(input)).rejects.toThrow(exception);

      expect(apiSecretHasher.hash).not.toBeCalled();
      expect.assertions(2);
    });
  });
});
