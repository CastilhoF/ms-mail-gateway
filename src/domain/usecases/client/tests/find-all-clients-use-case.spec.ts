import { mock, MockProxy } from 'jest-mock-extended';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import { DefaultClientDto } from '../dtos/default-client.dto';
import FindAllClientsUseCase from '../find-all-clients.use-case';

describe('find all clients use case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
  });

  describe('when get all clients', () => {
    it('should return all clients', async () => {
      const clientMock1 = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'www.test.com.br',
        'test',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const clientMock2 = new ClientEntity(
        '355242a5-4d0d-4199-bced-166ba023267d',
        'www.test2.com.br',
        'test2',
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2',
        '0d1eb304-4359-4507-817d-398bef7f7c3d',
        new Date(),
        new Date(),
      );

      const arrayMock = [clientMock1, clientMock2];

      const findAllMock =
        clientRepository.findAll.mockResolvedValueOnce(arrayMock);

      const useCase = new FindAllClientsUseCase(clientRepository);

      const resultExpect: DefaultClientDto[] = await useCase.execute();

      const output = resultExpect;

      expect(findAllMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });

    it('should return empty array', async () => {
      const arrayMock = [];

      const findAllMock =
        clientRepository.findAll.mockResolvedValueOnce(arrayMock);

      const useCase = new FindAllClientsUseCase(clientRepository);

      const resultExpect: DefaultClientDto[] = await useCase.execute();

      const output = resultExpect;

      expect(findAllMock).toBeCalledTimes(1);
      expect(resultExpect).toEqual(output);
      expect.assertions(2);
    });
  });
});
