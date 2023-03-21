import { Provider } from '@nestjs/common';
import { CONNECTION_POOL } from '../settings/database.module-definitions';
import ApplicationEnvironment from '../../../environment/base/application.environment';
import mysqlRawOptions from '../../../database/mysql/mysql-raw.options';
import MysqlRawEnvironment from '../../../database/mysql/environment/mysql-raw.environment';

const MysqlProvider: Provider = {
  provide: CONNECTION_POOL,
  useFactory: mysqlRawOptions,
  inject: [ApplicationEnvironment, MysqlRawEnvironment],
};

export default MysqlProvider;
