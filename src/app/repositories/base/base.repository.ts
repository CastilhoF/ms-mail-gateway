abstract class BaseRepository<Entity> {
  abstract findAll(): Promise<Entity[]>;
  abstract findMany(
    pagination: any,
    filter: Partial<Entity>,
  ): Promise<{ entities: Entity[]; total: number }>;
  abstract findByUid(uid: string): Promise<Entity>;
  abstract findOne(filter: Partial<Entity>): Promise<Entity>;
  abstract save(entity: Entity): Promise<Entity>;
  abstract update(uid: string, entity: Entity): Promise<Entity>;
  abstract patch(uid: string, partialEntity: Partial<Entity>): Promise<Entity>;
  abstract delete(uid: string): Promise<void>;
}

export default BaseRepository;
