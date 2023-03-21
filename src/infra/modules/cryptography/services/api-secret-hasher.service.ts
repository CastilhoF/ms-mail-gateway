import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { genSaltSync, hashSync, compare } from 'bcrypt';
import ApiSecretHasherInterface from '../../../../app/shared/interfaces/api-secret-hasher.interface';

@Injectable()
class ApiSecretHasherService implements ApiSecretHasherInterface {
  private readonly logger: Logger = new Logger(ApiSecretHasherService.name);
  async hash(apiSecret: string): Promise<string> {
    try {
      const salt = genSaltSync(10);
      return await hashSync(apiSecret, salt);
    } catch (error) {
      this.logger.error(`Failed to hash API secret: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to hash API secret: ${error.message}`,
      );
    }
  }

  async compare(apiSecret: string, hashedApiSecret: string): Promise<boolean> {
    try {
      return await compare(apiSecret, hashedApiSecret);
    } catch (error) {
      this.logger.error(`Failed to compare API secret: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to compare API secret: ${error.message}`,
      );
    }
  }
}

export default ApiSecretHasherService;
