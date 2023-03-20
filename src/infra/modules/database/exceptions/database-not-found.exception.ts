class DatabaseNotFoundException extends Error {
  name: string;
  message: string;
  stack: string;

  constructor(message: string, stack: string = null) {
    super(message);
    this.name = DatabaseNotFoundException.name;
    this.message = message;
    this.stack = stack;
  }
}

export default DatabaseNotFoundException;
