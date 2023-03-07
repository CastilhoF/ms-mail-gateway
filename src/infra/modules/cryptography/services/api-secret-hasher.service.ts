import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compare } from 'bcrypt';
import ApiSecretHasherInterface from '../../../../app/shared/interfaces/api-secret-hasher.interface';

@Injectable()
class ApiSecretHasherService implements ApiSecretHasherInterface {
  async hash(apiSecret: string): Promise<string> {
    const salt = genSaltSync(10);
    return await hashSync(apiSecret, salt);
  }

  async compare(apiSecret: string, hashedApiSecret: string): Promise<boolean> {
    return await compare(apiSecret, hashedApiSecret);
  }
}

export default ApiSecretHasherService;
