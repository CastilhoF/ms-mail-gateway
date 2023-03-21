import { mock, MockProxy } from 'jest-mock-extended';
import AuthenticateClientUseCase from '../authenticate-client.use-case';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import { AuthenticateClientInputDto } from '../dtos/authenticate-client-input.dto';
import { AuthenticateClientOutputDto } from '../dtos/authenticate-client-output.dto';
import JwtServiceInterface from '../../../../app/shared/interfaces/jwt-service.interface';
import ApiSecretHasherInterface from '../../../../app/shared/interfaces/api-secret-hasher.interface';

describe('Authenticate Cliente Use Case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;
  let jwtService: MockProxy<JwtServiceInterface> | null = null;
  let apiSecretHasher: MockProxy<ApiSecretHasherInterface> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
    jwtService = mock<JwtServiceInterface>();
    apiSecretHasher = mock<ApiSecretHasherInterface>();
  });

  describe('When client is authenticated', () => {
    it('should return a valid token', async () => {
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';

      const inputMock: AuthenticateClientInputDto = {
        apiKey: apiKeyHash,
        apiSecret: 'P@ass0rd',
      };

      const clientMock: ClientEntity = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'http://localhost:3000',
        'client-name',
        apiKeyHash,
        apiSecretHash,
        new Date(),
        new Date(),
      );

      const findOneClientMock =
        clientRepository.findOne.mockResolvedValueOnce(clientMock);

      const compareApiSecretMock =
        apiSecretHasher.compare.mockResolvedValueOnce(true);

      const useCase = new AuthenticateClientUseCase(
        clientRepository,
        apiSecretHasher,
        jwtService,
      );

      const resultExpect: AuthenticateClientOutputDto = await useCase.execute(
        inputMock,
      );

      const output: AuthenticateClientOutputDto = {
        accessToken: resultExpect.accessToken,
      };

      expect(findOneClientMock).toBeCalledTimes(1);
      expect(compareApiSecretMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(3);
    });
  });

  describe('When client is not authenticated', () => {
    it('should authenticate the client and return error - apiKey null', async () => {
      const apiKeyHash = null;

      const inputMock: AuthenticateClientInputDto = {
        apiKey: apiKeyHash,
        apiSecret: 'P@ass0rd',
      };

      const useCase = new AuthenticateClientUseCase(
        clientRepository,
        apiSecretHasher,
        jwtService,
      );

      const exception = 'Invalid input data';

      await expect(useCase.execute(inputMock)).rejects.toThrow(exception);
      expect.assertions(1);
    });

    it('should authenticate the client and return error - apiKey undefined', async () => {
      const apiKeyHash = undefined;

      const inputMock: AuthenticateClientInputDto = {
        apiKey: apiKeyHash,
        apiSecret: 'P@ass0rd',
      };

      const useCase = new AuthenticateClientUseCase(
        clientRepository,
        apiSecretHasher,
        jwtService,
      );

      const exception = 'Invalid input data';

      await expect(useCase.execute(inputMock)).rejects.toThrow(exception);
      expect.assertions(1);
    });

    it('should authenticate the client and return error - apiSecret null', async () => {
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';

      const inputMock: AuthenticateClientInputDto = {
        apiKey: apiKeyHash,
        apiSecret: null,
      };

      const useCase = new AuthenticateClientUseCase(
        clientRepository,
        apiSecretHasher,
        jwtService,
      );

      const exception = 'Invalid input data';

      await expect(useCase.execute(inputMock)).rejects.toThrow(exception);
      expect.assertions(1);
    });

    it('should authenticate the client and return error - apiSecret undefined', async () => {
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';

      const inputMock: AuthenticateClientInputDto = {
        apiKey: apiKeyHash,
        apiSecret: undefined,
      };

      const useCase = new AuthenticateClientUseCase(
        clientRepository,
        apiSecretHasher,
        jwtService,
      );

      const exception = 'Invalid input data';

      await expect(useCase.execute(inputMock)).rejects.toThrow(exception);
      expect.assertions(1);
    });
  });
});
