import { mock, MockProxy } from 'jest-mock-extended';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import { DefaultClientDto } from '../dtos/default-client.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import FindManyClientsUseCase from '../find-many-clients.use-case';

describe('find many clients use case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
  });

  describe('when client is found', () => {
    it('should return many clients', async () => {
      const clientMock: ClientEntity = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'www.test.com.br',
        'test',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const resultMock: { entities: ClientEntity[]; total: number } = {
        entities: [clientMock],
        total: 1,
      };

      const FindQueryMock: Partial<DefaultClientDto> = {
        host: 'www.test.com.br',
      };

      const findManyMock =
        clientRepository.findMany.mockResolvedValueOnce(resultMock);

      const paginationMock: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const useCase = new FindManyClientsUseCase(clientRepository);

      const resultExpect: { entities: DefaultClientDto[]; total: number } =
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

  describe('when client is not found', () => {
    it('should return empty array', async () => {
      const FindQueryMock: Partial<DefaultClientDto> = {
        host: 'www.test.com.br',
      };

      const findManyMock = clientRepository.findMany.mockResolvedValueOnce({
        entities: [],
        total: 0,
      });

      const paginationMock: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const useCase = new FindManyClientsUseCase(clientRepository);

      const resultExpect: { entities: DefaultClientDto[]; total: number } =
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
