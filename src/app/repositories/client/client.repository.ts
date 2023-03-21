import BaseRepository from '../base/base.repository';
import ClientEntity from '../../../domain/entities/client/client.entity';
import { PaginationDto } from '../../../domain/usecases/client/dtos/pagination.dto';

abstract class ClientRepository extends BaseRepository<ClientEntity> {
  abstract findAll(): Promise<ClientEntity[]>;

  abstract findMany(
    pagination: PaginationDto,
    filter: Partial<ClientEntity>,
  ): Promise<{ entities: ClientEntity[]; total: number }>;

  abstract findByUid(uid: string): Promise<ClientEntity>;

  abstract findOne(filter: Partial<ClientEntity>): Promise<ClientEntity>;

  abstract save(entity: ClientEntity): Promise<ClientEntity>;

  abstract update(uid: string, entity: ClientEntity): Promise<ClientEntity>;

  abstract patch(
    uid: string,
    partialEntity: Partial<ClientEntity>,
  ): Promise<ClientEntity>;

  abstract delete(uid: string): Promise<void>;
}

export default ClientRepository;
