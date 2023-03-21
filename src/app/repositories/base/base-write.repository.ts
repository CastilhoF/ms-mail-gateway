abstract class BaseWriteRepository<Entity> {
  abstract save(entity: Entity): Promise<void>;
  abstract update(uid: string, entity: Entity): Promise<void>;
  abstract patch(uid: string, partialEntity: Partial<Entity>): Promise<void>;
  abstract delete(uid: string): Promise<void>;
}

export default BaseWriteRepository;
