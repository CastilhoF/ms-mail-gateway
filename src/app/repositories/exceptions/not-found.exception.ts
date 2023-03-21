class NotFoundException extends Error {
  name: string;
  stack: string;

  constructor(message: string, stack: string = null) {
    super(message);
    this.name = NotFoundException.name;
    this.stack = stack;
  }
}

export default NotFoundException;
