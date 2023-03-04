import { Provider } from '@nestjs/common';
import UidGeneratorInterface from '../../../../../app/shared/interfaces/uid-generator.interface';
import UidGeneratorService from '../../../../modules/cryptography/services/uid-generator.service';

const uidGeneratorProvider: Provider = {
  provide: UidGeneratorInterface,
  useClass: UidGeneratorService,
};

export default uidGeneratorProvider;
