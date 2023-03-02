abstract class BaseWriteRepository<Entity> {
  abstract save(entity: Entity): Promise<void>;
  abstract update(id: string, entity: Entity): Promise<void>;
  abstract patch(id: string, partialEntity: Partial<Entity>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export default BaseWriteRepository;