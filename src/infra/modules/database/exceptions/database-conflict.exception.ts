class DatabaseConflictException extends Error {
  name: string;
  message: string;
  stack: string;

  constructor(entity: string, stack: string = null) {
    super(`This ${entity} already exists.`);
    this.name = DatabaseConflictException.name;
    this.message = `This ${entity} already exists.`;
    this.stack = stack;
  }
}

export default DatabaseConflictException;
