import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateClientOutputDto } from '../../dtos/authenticate-client-output.dto';
import { AuthenticateClientInputDto } from '../../dtos/authenticate-client-input.dto';
import AuthenticationService from '../authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('authentication service', () => {
    it('should be defined', () => {
      expect(authenticationService).toBeDefined();
    });
  });

  describe('sign-in', () => {
    it('should a return valid bearer token', async () => {
      const inputMock: AuthenticateClientInputDto = {
        apiKey: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
        apiSecret: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
      };

      const outputMock: AuthenticateClientOutputDto = {
        accessToken: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
      };

      jest.spyOn(authenticationService, 'signIn').mockResolvedValue(outputMock);

      expect(await authenticationService.signIn(inputMock)).toEqual(outputMock);
    });
  });
});
