import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import UidGeneratorInterface from '../../../../app/shared/interfaces/uid-generator.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
class UidGeneratorService implements UidGeneratorInterface {
  private readonly logger: Logger = new Logger(UidGeneratorService.name);
  async generate(): Promise<string> {
    try {
      return uuidv4();
    } catch (error) {
      this.logger.error(`Error generating UUID: ${error.message}`);
      throw new InternalServerErrorException(
        `Error generating UUID: ${error.message}`,
      );
    }
  }
}

export default UidGeneratorService;
