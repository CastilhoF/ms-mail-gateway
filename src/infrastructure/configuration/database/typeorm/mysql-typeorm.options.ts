import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import EnvironmentEntity from '../../environment/entity/environment.entity';
import ApplicationEnvironment from '../../environment/base/application.environment';
import MysqlEnvironment from './environment/mysql-typeorm.environment';

@Injectable()
class MysqlOptions implements TypeOrmOptionsFactory {
  private readonly IS_PRODUCTION: boolean;

  constructor(
    private readonly applicationConfig: ApplicationEnvironment,
    private readonly databaseConfig: MysqlEnvironment,
  ) {
    this.IS_PRODUCTION =
      this.applicationConfig.getNodeEnv() === EnvironmentEntity.PRODUCTION;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.databaseConfig.getDatabaseHost(),
      port: this.databaseConfig.getDatabasePort(),
      username: this.databaseConfig.getDatabaseUser(),
      password: this.databaseConfig.getDatabasePassword(),
      database: this.databaseConfig.getDatabaseName(),
      synchronize: this.databaseConfig.getDatabaseSynchronize(),
      autoLoadEntities: true,
      bigNumberStrings: true,
      cache: false,
      charset: 'UTF8_GENERAL_CI',
      connectTimeout: 10000,
      connectorPackage: 'mysql2',
      dateStrings: true,
      debug: !this.IS_PRODUCTION,
      dropSchema: false,
      insecureAuth: this.IS_PRODUCTION,
      logging: true,
      multipleStatements: true,
      poolSize: 10,
      retryAttempts: 5,
      retryDelay: 30000,
      supportBigNumbers: false,
      trace: !this.IS_PRODUCTION,
      timezone: 'local',
    };
  }
}

export default MysqlOptions;
