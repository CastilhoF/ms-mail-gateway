import { Provider } from '@nestjs/common';
import SenderRepository from '../../../../../app/repositories/sender/sender.repository';
import SenderMongoRepository from '../../../../modules/sender/repositories/sender-mongo.repository';

export const SenderRepositoryProvider: Provider = {
  provide: SenderRepository,
  useClass: SenderMongoRepository,
};
