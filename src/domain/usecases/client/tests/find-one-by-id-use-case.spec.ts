import { mock, MockProxy } from 'jest-mock-extended';
import DomainException from '../../../../domain/entities/shared/exceptions/domain.exception';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import { DefaultClientDto } from '../dtos/default-client.dto';
import FindOneClientByUidUseCase from '../find-one-client-by-uid.use-case';
import DefaultClientMapper from '../mappers/default-client.mapper';

describe('find one client by uid use case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
  });

  describe('when get one client by uid', () => {
    it('should return one client', async () => {
      const clientMock = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'www.test.com.br',
        'test',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const findByUidMock =
        clientRepository.findByUid.mockResolvedValueOnce(clientMock);

      const useCase = new FindOneClientByUidUseCase(clientRepository);

      const resultExpect: DefaultClientDto = await useCase.execute(
        '355242a5-4d0d-4199-bced-166ba023267d',
      );

      const output = DefaultClientMapper.toDto(clientMock);

      expect(findByUidMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });

    it('should return not found error', async () => {
      const id = '355242a5-4d0d-4199-bced-166ba023267d';

      const useCase = new FindOneClientByUidUseCase(clientRepository);

      const exception = new DomainException(`Client not found: ${id}`);

      await expect(
        useCase.execute('355242a5-4d0d-4199-bced-166ba023267d'),
      ).rejects.toThrow(exception);

      expect.assertions(1);
    });
  });
});
