import { Test, TestingModule } from '@nestjs/testing';
import ApiSecretHasherService from '../api-secret-hasher.service';

describe('ApiSecretHasherService', () => {
  let service: ApiSecretHasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiSecretHasherService],
    }).compile();

    service = module.get<ApiSecretHasherService>(ApiSecretHasherService);
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

  describe('compare', () => {
    it('should return true when the api secret matches the hashed api secret', async () => {
      const apiSecret = 'my-secret';
      const hashedApiSecret = '$2b$10$somesaltandhash';
      const compareMock = jest.fn().mockResolvedValue(true);
      jest.spyOn(service, 'compare').mockImplementation(compareMock);

      const result = await service.compare(apiSecret, hashedApiSecret);

      expect(result).toBe(true);
      expect(service.compare).toHaveBeenCalledWith(apiSecret, hashedApiSecret);
    });

    it('should return false when the api secret does not match the hashed api secret', async () => {
      const apiSecret = 'my-secret';
      const hashedApiSecret = '$2b$10$somesaltandhash';
      const compareMock = jest.fn().mockResolvedValue(false);
      jest.spyOn(service, 'compare').mockImplementation(compareMock);

      const result = await service.compare(apiSecret, hashedApiSecret);

      expect(result).toBe(false);
      expect(service.compare).toHaveBeenCalledWith(apiSecret, hashedApiSecret);
    });

    it('should throw an error when compare is called with null apiSecret', async () => {
      const hashedApiSecret = '$2b$10$somesaltandhash';
      await expect(service.compare(null, hashedApiSecret)).rejects.toThrow(
        Error,
      );
    });

    it('should throw an error when compare is called with undefined apiSecret', async () => {
      const hashedApiSecret = '$2b$10$somesaltandhash';
      await expect(service.compare(undefined, hashedApiSecret)).rejects.toThrow(
        Error,
      );
    });

    it('should throw an error when compare is called with null hashedApiSecret', async () => {
      const apiSecret = 'my-secret';
      await expect(service.compare(apiSecret, null)).rejects.toThrow(Error);
    });

    it('should throw an error when compare is called with undefined hashedApiSecret', async () => {
      const apiSecret = 'my-secret';
      await expect(service.compare(apiSecret, undefined)).rejects.toThrow(
        Error,
      );
    });
  });
});
