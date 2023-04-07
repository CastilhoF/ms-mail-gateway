import { Provider } from '@nestjs/common';
import JwtServiceInterface from '../../../../../app/shared/interfaces/jwt-service.interface';
import JwtService from '../../../../modules/authentication/services/jwt.service';

const jwtServiceProvider: Provider = {
  provide: JwtServiceInterface,
  useClass: JwtService,
};

export default jwtServiceProvider;
