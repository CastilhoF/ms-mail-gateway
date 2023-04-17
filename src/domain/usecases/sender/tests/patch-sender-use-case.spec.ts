import { mock, MockProxy } from 'jest-mock-extended';
import PatchSenderUseCase from '../patch-sender.use-case';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../entities/sender/sender.entity';
import DomainException from '../../../entities/shared/exceptions/domain.exception';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import DefaultSenderMapper from '../mappers/default-sender.mapper';

describe('Patch Sender Use Case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  describe('when patching a sender', () => {
    it('should return a patched sender - change name', async () => {
      const senderMock: SenderEntity = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'sender',
        'test@domain.com',
        'sendgrid',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        true,
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const input: Partial<DefaultSenderDto> = {
        uid: '355242a5-4d0d-4199-bced-166ba023267d',
        name: 'sender2',
      };

      const senderPatchedMock: SenderEntity = new SenderEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        input.name,
        senderMock.email,
        senderMock.service,
        senderMock.senderApiKey,
        senderMock.validated,
        senderMock.clientUid,
        senderMock.createdAt,
        senderMock.updatedAt,
      );

      const findByUidSenderMock =
        senderRepository.findByUid.mockResolvedValueOnce(senderMock);

      const senderPatchMock =
        senderRepository.patch.mockResolvedValueOnce(senderPatchedMock);

      const useCase = new PatchSenderUseCase(senderRepository);

      const resultExpect = await useCase.execute(input);

      const output: DefaultSenderDto =
        DefaultSenderMapper.toDto(senderPatchedMock);

      expect(resultExpect).toEqual(output);
      expect(findByUidSenderMock).toBeCalledTimes(1);
      expect(senderPatchMock).toBeCalledTimes(1);
      expect.assertions(3);
    });

    describe('when patching a client with invalid uid', () => {
      it('should throw an error - uid not passed', async () => {
        const input: Partial<DefaultSenderDto> = {
          uid: '',
          email: 'test2@domain.com',
        };

        const useCase = new PatchSenderUseCase(senderRepository);

        await expect(useCase.execute(input)).rejects.toThrowError(
          new DomainException('Sender uid is required'),
        );

        expect.assertions(1);
      });

      it('should throw an error - uid not found', async () => {
        const input: Partial<DefaultSenderDto> = {
          uid: '355242a5-4d0d-4199-bced-166ba023267d',
          email: 'test@domain.com',
        };

        const useCase = new PatchSenderUseCase(senderRepository);

        await expect(useCase.execute(input)).rejects.toThrowError(
          new DomainException(`Sender not found: ${input.uid}`),
        );
      });

      it('should throw an error - uid null', async () => {
        const input: Partial<DefaultSenderDto> = {
          uid: null,
          email: 'test@domain.com',
        };

        const useCase = new PatchSenderUseCase(senderRepository);

        await expect(useCase.execute(input)).rejects.toThrowError(
          new DomainException('Sender uid is required'),
        );
      });

      it('should throw an error - uid undefined', async () => {
        const input: Partial<DefaultSenderDto> = {
          uid: undefined,
          email: 'test@domain.com',
        };

        const useCase = new PatchSenderUseCase(senderRepository);

        await expect(useCase.execute(input)).rejects.toThrowError(
          new DomainException('Sender uid is required'),
        );
      });
    });
  });
});
