import { Injectable } from '@nestjs/common';
import JwtServiceInterface from '../../../../app/shared/interfaces/jwt-service.interface';
import { JwtService as jwt } from '@nestjs/jwt';

@Injectable()
class JwtService implements JwtServiceInterface {
  constructor(private readonly jwtService: jwt) {}
  async sign(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}

export default JwtService;
