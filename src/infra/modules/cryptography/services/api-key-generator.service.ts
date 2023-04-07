import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as crypto from 'crypto';
import ApiKeyGeneratorInterface from '../../../../app/shared/interfaces/api-key-generator.interface';

@Injectable()
class ApiKeyGeneratorService implements ApiKeyGeneratorInterface {
  private readonly logger: Logger = new Logger(ApiKeyGeneratorService.name);

  async hash(apiSecret: string): Promise<string> {
    try {
      const hash = crypto.createHash('sha256').update(apiSecret).digest('hex');
      return hash;
    } catch (error) {
      this.logger.error(`Error hashing API key: ${error.message}`);
      throw new InternalServerErrorException(
        `Error hashing API key: ${error.message}`,
      );
    }
  }
}

export default ApiKeyGeneratorService;
