import BaseRepository from '../base/base.repository';
import SenderEntity from '../../../domain/entities/sender/sender.entity';
import { PaginationDto } from '../../../domain/usecases/sender/dtos/pagination.dto';

abstract class SenderRepository extends BaseRepository<SenderEntity> {
  abstract findAll(): Promise<SenderEntity[]>;

  abstract findMany(
    pagination: PaginationDto,
    filter: Partial<SenderEntity>,
  ): Promise<{ entities: SenderEntity[]; total: number }>;

  abstract findByUid(uid: string): Promise<SenderEntity>;

  abstract findOne(filter: Partial<SenderEntity>): Promise<SenderEntity>;

  abstract findOneByEmail(email: string): Promise<SenderEntity>;

  abstract findOneByName(name: string): Promise<SenderEntity>;

  abstract save(entity: SenderEntity): Promise<SenderEntity>;

  abstract update(uid: string, entity: SenderEntity): Promise<SenderEntity>;

  abstract patch(
    uid: string,
    partialEntity: Partial<SenderEntity>,
  ): Promise<SenderEntity>;

  abstract delete(uid: string): Promise<void>;
}

export default SenderRepository;
