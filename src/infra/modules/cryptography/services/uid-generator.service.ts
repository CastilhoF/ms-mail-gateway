import { Injectable } from '@nestjs/common';
import UidGeneratorInterface from '../../../../app/shared/interfaces/uid-generator.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
class UidGeneratorService implements UidGeneratorInterface {
  async generate(): Promise<string> {
    return uuidv4();
  }
}

export default UidGeneratorService;
