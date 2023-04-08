import { mock, MockProxy } from 'jest-mock-extended';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../entities/sender/sender.entity';
import DomainException from '../../../entities/shared/exceptions/domain.exception';
import DeleteSenderUseCase from '../delete-sender.use-case';

describe('Delete Sender Use Case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  describe('when deleting sender by sender uid', () => {
    it('when sender exists', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const senderId = '355242a5-4d0d-4199-bced-166ba023267d';
      const name = 'test';
      const email = 'sender@domain.com';
      const senderApiKey = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const clientUid = '0d1eb304-4359-4507-817d-398bef7f7c3d';
      const validated = true;
      const service = 'test';

      const input = senderId;

      const senderMock: SenderEntity = new SenderEntity(
        senderId,
        name,
        email,
        service,
        senderApiKey,
        validated,
        clientUid,
        createdAt,
        updatedAt,
      );

      senderRepository.findByUid.mockResolvedValue(senderMock);

      const useCase = new DeleteSenderUseCase(senderRepository);

      await useCase.execute(input);

      expect(senderRepository.delete).toBeCalledWith(senderId);
      expect(senderRepository.delete).toBeCalledTimes(1);
      expect.assertions(2);
    });
  });

  describe('should throw an error', () => {
    it('when sender does not exist', async () => {
      const senderId = '355242a5-4d0d-4199-bced-166ba023267d';

      const input = senderId;

      senderRepository.findByUid.mockResolvedValue(null);

      const useCase = new DeleteSenderUseCase(senderRepository);

      await expect(useCase.execute(input)).rejects.toThrow(
        new DomainException(`Sender not found: ${senderId}`),
      );
    });

    it('when sender uid is not provided', async () => {
      const input = '';

      const useCase = new DeleteSenderUseCase(senderRepository);

      await expect(useCase.execute(input)).rejects.toThrow(
        new DomainException('Sender uid is required'),
      );
    });
  });
});
