import { Provider } from '@nestjs/common';
import ClientRepository from '../../../../../app/repositories/client/client.repository';
import ClientMongoRepository from '../../../../modules/client/repositories/client-mongo.repository';

export const ClientRepositoryProvider: Provider = {
  provide: ClientRepository,
  useClass: ClientMongoRepository,
};
