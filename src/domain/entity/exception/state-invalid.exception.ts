class StateInvalidException extends Error {
  name: string;
  message: string;
  stack: string;

  constructor(value: string, stack: string = null) {
    super(`This state ${value} is invalid.`);
    this.name = StateInvalidException.name;
    this.stack = stack;
  }
}

export default StateInvalidException;
