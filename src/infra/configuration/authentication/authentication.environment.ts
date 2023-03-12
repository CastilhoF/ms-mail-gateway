import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class AuthenticationEnvironment {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }

  get jwtExpirationTime(): string {
    return this.configService.get('JWT_EXPIRATION_TIME');
  }
}

export default AuthenticationEnvironment;
