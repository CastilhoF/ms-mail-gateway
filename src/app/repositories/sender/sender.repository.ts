import BaseRepository from '../base/base.repository';
import SenderEntity from '../../../domain/entities/sender/sender.entity';

abstract class SenderRepository extends BaseRepository<SenderEntity> {
  abstract findAll(): Promise<SenderEntity[]>

  abstract findMany(filter: Partial<SenderEntity>): Promise<SenderEntity[]>

  abstract findById(id: string): Promise<SenderEntity>

  abstract findOne(filter: Partial<SenderEntity>): Promise<SenderEntity>

  abstract findOneByEmail(email: string): Promise<SenderEntity>

  abstract findOneByName(name: string): Promise<SenderEntity>

  abstract save(entity: SenderEntity): Promise<SenderEntity>

  abstract update(id: string, entity: SenderEntity): Promise<SenderEntity>

  abstract patch(id: string, partialEntity: Partial<SenderEntity>): Promise<SenderEntity>

  abstract delete(id: string): Promise<void>
}

export default SenderRepository;
