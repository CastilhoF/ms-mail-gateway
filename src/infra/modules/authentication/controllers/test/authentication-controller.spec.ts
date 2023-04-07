import { AuthenticateClientInputDto } from '../../dtos/authenticate-client-input.dto';
import { AuthenticateClientOutputDto } from '../../dtos/authenticate-client-output.dto';
import AuthenticationService from '../../services/authentication.service';
import AuthenticationController from '../authentication.controller';
import AuthenticateClientUseCase from '../../../../../domain/usecases/client/authenticate-client.use-case';
import ClientRepository from '../../../../../app/repositories/client/client.repository';
import ApiSecretHasherInterface from '../../../../../app/shared/interfaces/api-secret-hasher.interface';
import JwtServiceInterface from '../../../../../app/shared/interfaces/jwt-service.interface';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;
  let apiSecretHasher: ApiSecretHasherInterface;
  let jwtService: JwtServiceInterface;
  let clientRepository: ClientRepository;
  const authenticateClientUseCase: AuthenticateClientUseCase =
    new AuthenticateClientUseCase(
      clientRepository,
      apiSecretHasher,
      jwtService,
    );

  beforeEach(() => {
    authenticationService = new AuthenticationService(
      authenticateClientUseCase,
    );
    authenticationController = new AuthenticationController(
      authenticationService,
    );
  });

  describe('authenticateClient', () => {
    const inputMock: AuthenticateClientInputDto = {
      apiKey: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
      apiSecret: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
    };

    const outputMock: AuthenticateClientOutputDto = {
      accessToken: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
    };

    it('should return an access token', async () => {
      jest.spyOn(authenticationService, 'signIn').mockResolvedValue(outputMock);

      expect(
        await authenticationController.authenticateClient(inputMock),
      ).toEqual(outputMock);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(authenticationService, 'signIn')
        .mockRejectedValue(new Error());

      await expect(
        authenticationController.authenticateClient(inputMock),
      ).rejects.toThrowError();
    });
  });
});
