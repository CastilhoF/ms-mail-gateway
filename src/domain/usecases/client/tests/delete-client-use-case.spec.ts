import { mock, MockProxy } from 'jest-mock-extended';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../entities/client/client.entity';
import DomainException from '../../../entities/shared/exceptions/domain.exception';
import DeleteClientUseCase from '../delete-client.use-case';

describe('Delete Client Use Case', () => {
  let clientRepository: MockProxy<ClientRepository> | null = null;

  beforeEach(() => {
    clientRepository = mock<ClientRepository>();
  });

  describe('when deleting client by client uid', () => {
    it('when client exists', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const clientId = '355242a5-4d0d-4199-bced-166ba023267d';
      const apiKeyHash = '446f1542-fb57-4e10-9d2e-5ff7e9939bb2';
      const apiSecretHash = '0d1eb304-4359-4507-817d-398bef7f7c3d';
      const host = 'www.test.com.br';
      const client = 'test';

      const input = clientId;

      const clientMock: ClientEntity = new ClientEntity(
        clientId,
        host,
        client,
        apiKeyHash,
        apiSecretHash,
        createdAt,
        updatedAt,
      );

      clientRepository.findByUid.mockResolvedValue(clientMock);

      const useCase = new DeleteClientUseCase(clientRepository);

      await useCase.execute(input);

      expect(clientRepository.delete).toBeCalledWith(clientId);
      expect(clientRepository.delete).toBeCalledTimes(1);
      expect.assertions(2);
    });

    describe('should throw an error', () => {
      it('when client does not exist', async () => {
        const clientId = '355242a5-4d0d-4199-bced-166ba023267d';

        const input = clientId;

        clientRepository.findByUid.mockResolvedValue(null);

        const useCase = new DeleteClientUseCase(clientRepository);

        await expect(useCase.execute(input)).rejects.toThrow(
          new DomainException(`Client not found: ${clientId}`),
        );

        expect(clientRepository.delete).not.toBeCalled();
        expect.assertions(2);
      });

      it('when client uid is not provided - uid is null', async () => {
        const input = null;

        const useCase = new DeleteClientUseCase(clientRepository);

        await expect(useCase.execute(input)).rejects.toThrow(
          new DomainException('Client uid is required'),
        );

        expect(clientRepository.delete).not.toBeCalled();
        expect.assertions(2);
      });

      it('when client uid is not provided - uid is undefined', async () => {
        const input = undefined;

        const useCase = new DeleteClientUseCase(clientRepository);

        await expect(useCase.execute(input)).rejects.toThrow(
          new DomainException('Client uid is required'),
        );

        expect(clientRepository.delete).not.toBeCalled();
        expect.assertions(2);
      });
    });
  });
});
