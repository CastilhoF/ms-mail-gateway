import { Test, TestingModule } from '@nestjs/testing';
import ApiKeyGeneratorService from '../api-key-generator.service';

describe('ApiKeyGeneratorService', () => {
  let service: ApiKeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyGeneratorService],
    }).compile();

    service = module.get<ApiKeyGeneratorService>(ApiKeyGeneratorService);
  });

  describe('hash', () => {
    it('should return a hashed string', async () => {
      const apiSecret = 'my-secret';
      const hashedApiSecret = '$2b$10$somesaltandhash';
      jest.spyOn(service, 'hash').mockResolvedValue(hashedApiSecret);

      const result = await service.hash(apiSecret);

      expect(result).toBe(hashedApiSecret);
      expect(service.hash).toHaveBeenCalledWith(apiSecret);
    });

    it('should throw an error when hash is called with null', async () => {
      await expect(service.hash(null)).rejects.toThrow(Error);
    });

    it('should throw an error when hash is called with undefined', async () => {
      await expect(service.hash(undefined)).rejects.toThrow(Error);
    });
  });
});
