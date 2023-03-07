import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import ApiKeyGeneratorInterface from '../../../../app/shared/interfaces/api-key-generator.interface';

@Injectable()
class ApiKeyGeneratorService implements ApiKeyGeneratorInterface {
  async hash(apiSecret: string): Promise<string> {
    const salt = genSaltSync(10);
    return await hashSync(apiSecret, salt);
  }
}

export default ApiKeyGeneratorService;
