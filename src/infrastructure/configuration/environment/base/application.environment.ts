import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ApplicationInterface from './application.interface';
import EnvironmentEntity from '../entity/environment.entity';

@Injectable()
class ApplicationEnvironment implements ApplicationInterface {
  constructor(private configService: ConfigService) {}

  getAppName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  getAppHost(): string {
    return this.configService.get<string>('APP_HOST');
  }

  getAppPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  getNodeEnv(): EnvironmentEntity {
    return this.configService.get<EnvironmentEntity>('NODE_ENV');
  }
}

export default ApplicationEnvironment;
