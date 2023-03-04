import { Provider } from '@nestjs/common';
import ApiKeyGeneratorInterface from '../../../../../app/shared/interfaces/api-key-generator.interface';
import ApiKeyGeneratorService from '../../../../modules/cryptography/services/api-key-generator.service';

const apiKeyGeneratorProvider: Provider = {
  provide: ApiKeyGeneratorInterface,
  useClass: ApiKeyGeneratorService,
};

export default apiKeyGeneratorProvider;
