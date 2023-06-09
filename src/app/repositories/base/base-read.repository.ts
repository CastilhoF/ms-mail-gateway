abstract class BaseReadRepository<Entity> {
  abstract findAll(): Promise<Entity[]>;
  abstract findMany(filter: string): Promise<Entity[]>;
  abstract findById(uid: string): Promise<Entity>;
  abstract findOne(filter: string): Promise<Entity>;
}

export default BaseReadRepository;
