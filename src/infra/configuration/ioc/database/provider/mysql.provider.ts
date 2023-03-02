import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import MysqlTypeOrmEnvironment from 'src/infrastructure/configuration/database/typeorm/environment/mysql-typeorm.environment';
import MysqlOptions from 'src/infrastructure/configuration/database/typeorm/mysql-typeorm.options';
import ApplicationEnvironment from '../../../environment/base/application.environment';

const MysqlTypeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  useClass: MysqlOptions,
  inject: [ApplicationEnvironment, MysqlTypeOrmEnvironment],
  extraProviders: [ApplicationEnvironment, MysqlTypeOrmEnvironment],
};

export default MysqlTypeOrmModuleOptions;
