import { mock, MockProxy } from 'jest-mock-extended';
import ChangeSenderValidatedUseCase from '../change-sender-validated.use-case';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';
import DomainException from '../../../../domain/entities/shared/exceptions/domain.exception';
import { DefaultSenderDto } from '../dtos/default-sender.dto';

describe('Change Validated Sender Use Case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  describe('when changing sender validated to true', () => {
    const inputMockTrue: Partial<DefaultSenderDto> = {
      uid: '355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
    };

    const inputMockFalse: Partial<DefaultSenderDto> = {
      uid: '355242a5-4d0d-4199-bced-166ba023267d',
      validated: false,
    };

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

    it('when sender exists and change to true', async () => {
      const input: Partial<DefaultSenderDto> = inputMockTrue;

      const findByUidMock =
        senderRepository.findByUid.mockResolvedValueOnce(senderMock);

      const useCase = new ChangeSenderValidatedUseCase(senderRepository);

      const resultExpect = `Validated successfully changed for sender: ${input.uid}`;

      senderMock.validated = input.validated;

      const updateMock =
        senderRepository.update.mockResolvedValueOnce(senderMock);

      const result = await useCase.execute(input);

      expect(findByUidMock).toBeCalledTimes(1);
      expect(findByUidMock).toBeCalledWith(input.uid);
      expect(updateMock).toBeCalledTimes(1);
      expect(result).toEqual(resultExpect);

      expect.assertions(4);
    });

    it('when sender exists and change to false', async () => {
      const input: Partial<DefaultSenderDto> = inputMockFalse;

      const findByUidMock =
        senderRepository.findByUid.mockResolvedValueOnce(senderMock);

      const useCase = new ChangeSenderValidatedUseCase(senderRepository);

      const resultExpect = `Validated successfully changed for sender: ${input.uid}`;

      const updateMock =
        senderRepository.update.mockResolvedValueOnce(senderMock);

      const result = await useCase.execute(input);

      expect(findByUidMock).toBeCalledTimes(1);
      expect(findByUidMock).toBeCalledWith(input.uid);
      expect(updateMock).toBeCalledTimes(1);
      expect(result).toEqual(resultExpect);

      expect.assertions(4);
    });

    it('when sender not exists', async () => {
      const input: Partial<DefaultSenderDto> = inputMockTrue;

      const findByUidMock =
        senderRepository.findByUid.mockResolvedValueOnce(null);

      const useCase = new ChangeSenderValidatedUseCase(senderRepository);

      await expect(useCase.execute(input)).rejects.toThrowError(
        new DomainException(`Sender not found: ${input.uid}`),
      );

      expect(findByUidMock).toBeCalledTimes(1);
      expect(findByUidMock).toBeCalledWith(input.uid);

      expect.assertions(3);
    });

    it('when sender exists and change to true and update fails', async () => {
      const input: Partial<DefaultSenderDto> = inputMockTrue;

      const findByUidMock =
        senderRepository.findByUid.mockResolvedValueOnce(senderMock);

      const updateMock = senderRepository.update.mockRejectedValueOnce(
        new Error('Update error'),
      );

      const useCase = new ChangeSenderValidatedUseCase(senderRepository);

      await expect(useCase.execute(input)).rejects.toThrowError(
        new Error('Update error'),
      );

      expect(findByUidMock).toBeCalledTimes(1);
      expect(findByUidMock).toBeCalledWith(input.uid);
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith(input.uid, senderMock);

      expect.assertions(5);
    });

    it('when sender exists and change to false and update fails', async () => {
      const input: Partial<DefaultSenderDto> = inputMockFalse;

      const findByUidMock =
        senderRepository.findByUid.mockResolvedValueOnce(senderMock);

      const updateMock = senderRepository.update.mockRejectedValueOnce(
        new Error('Update error'),
      );

      const useCase = new ChangeSenderValidatedUseCase(senderRepository);

      await expect(useCase.execute(input)).rejects.toThrowError(
        new Error('Update error'),
      );

      expect(findByUidMock).toBeCalledTimes(1);
      expect(findByUidMock).toBeCalledWith(input.uid);
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith(input.uid, senderMock);

      expect.assertions(5);
    });
  });
});
