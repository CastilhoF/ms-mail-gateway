import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compare } from 'bcrypt';
import ApiSecretHasherInterface from '../../../../app/shared/interfaces/api-secret-hasher.interface';

@Injectable()
class ApiSecretHasherService implements ApiSecretHasherInterface {
  hash(apiSecret: string): string {
    const salt = genSaltSync(10);
    return hashSync(apiSecret, salt);
  }

  compare(apiSecret: string, hashedApiSecret: string): Promise<boolean> {
    return compare(apiSecret, hashedApiSecret);
  }
}

export default ApiSecretHasherService;
