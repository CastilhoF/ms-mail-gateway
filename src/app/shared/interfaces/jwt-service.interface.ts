import { JwtPayloadInterface } from './jwt-payload.interface';

abstract class JwtServiceInterface {
  abstract sign(payload: JwtPayloadInterface): Promise<string>;
}

export default JwtServiceInterface;
