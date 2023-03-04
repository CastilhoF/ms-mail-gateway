import { Provider } from '@nestjs/common';
import ApiSecretHasherInterface from '../../../../../app/shared/interfaces/api-secret-hasher.interface';
import ApiSecretHasherService from '../../../../modules/cryptography/services/api-secret-hasher.service';

const apiSecretHasherProvider: Provider = {
  provide: ApiSecretHasherInterface,
  useClass: ApiSecretHasherService,
};

export default apiSecretHasherProvider;
