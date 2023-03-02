abstract class BaseRepository<Entity> {
  abstract findAll(): Promise<Entity[]>;
  abstract findMany(filter: Partial<Entity>): Promise<Entity[]>;
  abstract findById(id: string): Promise<Entity>;
  abstract findOne(filter: Partial<Entity>): Promise<Entity>;
  abstract save(entity: Entity): Promise<Entity>;
  abstract update(id: string, entity: Entity): Promise<Entity>;
  abstract patch(id: string, partialEntity: Partial<Entity>): Promise<Entity>;
  abstract delete(id: string): Promise<void>;
}

export default BaseRepository;