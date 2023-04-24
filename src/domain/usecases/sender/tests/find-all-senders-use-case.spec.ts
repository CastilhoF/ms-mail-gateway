import { mock, MockProxy } from 'jest-mock-extended';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../entities/sender/sender.entity';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import FindAllSendersUseCase from '../find-all-senders.use-case';

describe('find all senders use case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  describe('when get all senders', () => {
    it('should return all senders', async () => {
      const senderMock1 = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'sender1',
        'test@domain.com',
        'sendgrid',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        true,
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const senderMock2 = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'sender2',
        'test2@domain.com',
        'sendgrid',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        true,
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const arrayMock = [senderMock1, senderMock2];

      const findAllMock =
        senderRepository.findAll.mockResolvedValueOnce(arrayMock);

      const useCase = new FindAllSendersUseCase(senderRepository);

      const resultExpect: DefaultSenderDto[] = await useCase.execute();

      const output = resultExpect;

      expect(findAllMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });

    it('should return empty array', async () => {
      const arrayMock = [];

      const findAllMock =
        senderRepository.findAll.mockResolvedValueOnce(arrayMock);

      const useCase = new FindAllSendersUseCase(senderRepository);

      const resultExpect: DefaultSenderDto[] = await useCase.execute();

      const output = resultExpect;

      expect(findAllMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });
  });
});
