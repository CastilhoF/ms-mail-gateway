import { mock, MockProxy } from 'jest-mock-extended';
import DomainException from '../../../../domain/entities/shared/exceptions/domain.exception';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../entities/sender/sender.entity';
import DefaultSenderMapper from '../mappers/default-sender.mapper';
import FindSenderByClientUidUseCase from '../find-sender-by-client-uid.use-case';

describe('find sender by client uid use case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  describe('when get one sender by client uid', () => {
    const senderMock = new SenderEntity(
      '355242a5-4d0d-4199-bced-166ba023267d',
      'Sender Name',
      'sender@domain.com',
      'Sendgrid',
      '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      false,
      '355242a5-4d0d-4199-bced-166ba023267d',
      new Date(),
      new Date(),
    );

    const inputMock = senderMock.clientUid;

    it('when sender exists', async () => {
      const input: string = inputMock;

      senderRepository.findOne.mockResolvedValueOnce(senderMock);

      const useCase = new FindSenderByClientUidUseCase(senderRepository);

      const resultExpect = DefaultSenderMapper.toDto(senderMock);

      const result = await useCase.execute(input);

      expect(result).toEqual(resultExpect);

      expect.assertions(1);
    });

    it('when sender not exists', async () => {
      const input: string = inputMock;

      senderRepository.findOne.mockResolvedValueOnce(undefined);

      const useCase = new FindSenderByClientUidUseCase(senderRepository);

      const resultExpect = new DomainException(`Sender not found: ${input}`);

      try {
        await useCase.execute(input);
      } catch (error) {
        expect(error).toEqual(resultExpect);
      }

      expect.assertions(1);
    });
  });
});
