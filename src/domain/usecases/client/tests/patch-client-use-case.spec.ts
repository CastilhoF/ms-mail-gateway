import { mock, MockProxy } from 'jest-mock-extended';
import PatchClientUseCase from '../patch-client.use-case';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import DomainException from '../../../entities/shared/exceptions/domain.exception';
import { DefaultClientDto } from '../dtos/default-client.dto';
import DefaultClientMapper from '../mappers/default-client.mapper';
import ApiKeyGeneratorInterface from '../../../../app/shared/interfaces/api-key-generator.interface';

describe('Patch Client Use Case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;
  let apiKeyGenerator: MockProxy<ApiKeyGeneratorInterface> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
    apiKeyGenerator = mock<ApiKeyGeneratorInterface>();
  });

  describe('when patching a client', () => {
    it('should return the patched client - change host', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();

      const clientMock: ClientEntity = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'www.test.com.br',
        'Test',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        createdAt,
        updatedAt,
      );

      const input: Partial<DefaultClientDto> = {
        id: '355242a5-4d0d-4199-bced-166ba023267d',
        host: 'www.test2.com.br',
      };

      const clientPatchedMock: ClientEntity = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        input.host,
        'Test',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        createdAt,
        updatedAt,
      );

      const findByIdClientMock =
        clientRepository.findById.mockResolvedValueOnce(clientMock);

      const clientPatchMock =
        clientRepository.patch.mockResolvedValueOnce(clientPatchedMock);

      const useCase = new PatchClientUseCase(clientRepository, apiKeyGenerator);

      const resultExpect = await useCase.execute(input);

      const output: DefaultClientDto =
        DefaultClientMapper.toDto(clientPatchedMock);

      expect(findByIdClientMock).toBeCalledTimes(1);
      expect(clientPatchMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);

      expect.assertions(3);
    });

    it('should return the patched client - change client', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();

      const clientMock: ClientEntity = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'www.test.com.br',
        'Test',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        createdAt,
        updatedAt,
      );

      const input: Partial<DefaultClientDto> = {
        id: '355242a5-4d0d-4199-bced-166ba023267d',
        client: 'Test_New_Test',
      };

      const clientPatchedMock: ClientEntity = new ClientEntity(
        clientMock.id,
        clientMock.host,
        input.client,
        clientMock.apiKey,
        clientMock.apiSecret,
        createdAt,
        updatedAt,
      );

      const findByIdClientMock =
        clientRepository.findById.mockResolvedValueOnce(clientMock);

      const clientPatchMock =
        clientRepository.patch.mockResolvedValueOnce(clientPatchedMock);

      const apiKeyHashed = apiKeyGenerator.hash.mockResolvedValueOnce(
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
      );

      const useCase = new PatchClientUseCase(clientRepository, apiKeyGenerator);

      const resultExpect = await useCase.execute(input);

      const output: DefaultClientDto =
        DefaultClientMapper.toDto(clientPatchedMock);

      expect(findByIdClientMock).toBeCalledTimes(1);
      expect(apiKeyHashed).toBeCalledTimes(1);
      expect(clientPatchMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);

      expect.assertions(4);
    });
  });

  describe('when patching a client with invalid id', () => {
    it('should throw an error - id not passed', async () => {
      const input: Partial<DefaultClientDto> = {
        id: '',
        host: 'www.test2.com.br',
      };

      const useCase = new PatchClientUseCase(clientRepository, apiKeyGenerator);

      await expect(useCase.execute(input)).rejects.toThrow(DomainException);

      expect.assertions(1);
    });

    it('should throw an error - id null', async () => {
      const input: Partial<DefaultClientDto> = {
        id: null,
        host: 'www.test2.com.br',
      };

      const useCase = new PatchClientUseCase(clientRepository, apiKeyGenerator);

      await expect(useCase.execute(input)).rejects.toThrow(DomainException);

      expect.assertions(1);
    });

    it('should throw an error - id undefined', async () => {
      const input: Partial<DefaultClientDto> = {
        id: undefined,
        host: 'www.test2.com.br',
      };

      const useCase = new PatchClientUseCase(clientRepository, apiKeyGenerator);

      await expect(useCase.execute(input)).rejects.toThrow(DomainException);

      expect.assertions(1);
    });

    it('should throw an error - find by id return not found', async () => {
      const input: Partial<DefaultClientDto> = {
        id: '355242a5-4d0d-4199-bced-166ba023267d',
        host: 'www.test2.com.br',
      };

      const findByIdClientMock =
        clientRepository.findById.mockResolvedValueOnce(null);

      const useCase = new PatchClientUseCase(clientRepository, apiKeyGenerator);

      await expect(useCase.execute(input)).rejects.toThrow(DomainException);

      expect(findByIdClientMock).toBeCalledTimes(1);

      expect.assertions(2);
    });
  });
});
