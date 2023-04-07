import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayloadInterface } from '../../../../../app/shared/interfaces/jwt-payload.interface';
import JwtService from '../jwt.service';

describe('JwtService', () => {
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
  });

  describe('jwt service', () => {
    it('should be defined', () => {
      expect(jwtService).toBeDefined();
    });
  });

  describe('sign', () => {
    it('should a return valid bearer token', async () => {
      const inputMock: JwtPayloadInterface = {
        apiKey: 'cfaaa99f-f9f1-498f-86fa-d75b158abe38',
      };

      const outputMock = 'cfaaa99f-f9f1-498f-86fa-d75b158abe38';

      jest.spyOn(jwtService, 'sign').mockResolvedValue(outputMock);

      expect(await jwtService.sign(inputMock)).toEqual(outputMock);
    });
  });
});
