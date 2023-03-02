interface BaseUseCase<TEntity> {
  execute(...args: any[]): Promise<TEntity> | TEntity;
}

export default BaseUseCase;
