import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import ApiKeyGeneratorInterface from '../../../../app/shared/interfaces/api-key-generator.interface';

@Injectable()
class ApiKeyGeneratorService implements ApiKeyGeneratorInterface {
  private readonly logger: Logger = new Logger(ApiKeyGeneratorService.name);

  async hash(apiSecret: string): Promise<string> {
    try {
      const salt = genSaltSync(10);
      return await hashSync(apiSecret, salt);
    } catch (error) {
      this.logger.error(`Error hashing API key: ${error.message}`);
      throw new InternalServerErrorException(
        `Error hashing API key: ${error.message}`,
      );
    }
  }
}

export default ApiKeyGeneratorService;
