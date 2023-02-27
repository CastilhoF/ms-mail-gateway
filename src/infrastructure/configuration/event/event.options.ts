import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';

const eventOptions: EventEmitterModuleOptions = {
  delimiter: '.',
  global: true,
  ignoreErrors: false,
  maxListeners: 50,
  newListener: false,
  removeListener: false,
  wildcard: false,
  verboseMemoryLeak: true,
};

export default eventOptions;
