import BaseRepository from '../base/base.repository';
import ClientEntity from '../../../domain/entities/client/client.entity';

abstract class ClientRepository extends BaseRepository<ClientEntity> {
  abstract findAll(): Promise<ClientEntity[]>;

  abstract findMany(filter: Partial<ClientEntity>): Promise<ClientEntity[]>;

  abstract findById(id: string): Promise<ClientEntity>;

  abstract findOne(filter: Partial<ClientEntity>): Promise<ClientEntity>;

  abstract save(entity: ClientEntity): Promise<ClientEntity>;

  abstract update(id: string, entity: ClientEntity): Promise<ClientEntity>;

  abstract patch(
    id: string,
    partialEntity: Partial<ClientEntity>,
  ): Promise<ClientEntity>;

  abstract delete(id: string): Promise<void>;
}

export default ClientRepository;
