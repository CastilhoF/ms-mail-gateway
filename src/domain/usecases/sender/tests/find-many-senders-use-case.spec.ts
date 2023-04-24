import { mock, MockProxy } from 'jest-mock-extended';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../entities/sender/sender.entity';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import FindManySendersUseCase from '../find-many-senders.use-case';

describe('find many senders use case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  describe('when sender is found', () => {
    it('should return many senders', async () => {
      const senderMock = new SenderEntity(
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

      const resultMock: { entities: SenderEntity[]; total: number } = {
        entities: [senderMock],
        total: 1,
      };

      const FindQueryMock: Partial<DefaultSenderDto> = {
        name: 'sender',
      };

      const findManyMock =
        senderRepository.findMany.mockResolvedValueOnce(resultMock);

      const paginationMock: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const useCase = new FindManySendersUseCase(senderRepository);

      const resultExpect: { entities: DefaultSenderDto[]; total: number } =
        await useCase.execute({
          pagination: paginationMock,
          data: FindQueryMock,
        });

      const output = resultExpect;

      expect(findManyMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });
  });

  describe('when sender is not found', () => {
    it('should return empty array', async () => {
      const resultMock: { entities: SenderEntity[]; total: number } = {
        entities: [],
        total: 0,
      };

      const FindQueryMock: Partial<DefaultSenderDto> = {
        name: 'sender',
      };

      const findManyMock =
        senderRepository.findMany.mockResolvedValueOnce(resultMock);

      const paginationMock: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const useCase = new FindManySendersUseCase(senderRepository);

      const resultExpect: { entities: DefaultSenderDto[]; total: number } =
        await useCase.execute({
          pagination: paginationMock,
          data: FindQueryMock,
        });

      const output = resultExpect;

      expect(findManyMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });

    it('should return empty array', async () => {
      const resultMock: { entities: SenderEntity[]; total: number } = {
        entities: [],
        total: 0,
      };

      const FindQueryMock: Partial<DefaultSenderDto> = {
        name: 'sender',
      };

      const findManyMock =
        senderRepository.findMany.mockResolvedValueOnce(resultMock);

      const paginationMock: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const useCase = new FindManySendersUseCase(senderRepository);

      const resultExpect: { entities: DefaultSenderDto[]; total: number } =
        await useCase.execute({
          pagination: paginationMock,
          data: FindQueryMock,
        });

      const output = resultExpect;

      expect(findManyMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });
  });
});
