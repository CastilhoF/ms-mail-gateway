import { createPool } from 'mysql2/promise';
import ApplicationInterface from '../../environment/base/application.interface';
import DatabaseInterface from '../base/environment/database.interface';
import EnvironmentEntity from '../../environment/entity/environment.entity';

const mysqlRawOptions = (
  applicationConfig: ApplicationInterface,
  databaseConfig: DatabaseInterface,
) => {
  const isProduction =
    applicationConfig.getNodeEnv() === EnvironmentEntity.PRODUCTION;

  return createPool({
    bigNumberStrings: true,
    charset: 'UTF8_GENERAL_CI',
    compress: true,
    connectionLimit: 10,
    connectTimeout: 10000,
    database: databaseConfig.getDatabaseName(),
    dateStrings: true,
    debug: !isProduction,
    decimalNumbers: true,
    // enableKeepAlive: true,
    host: databaseConfig.getDatabaseHost(),
    insecureAuth: isProduction,
    multipleStatements: true,
    nestTables: true,
    rowsAsArray: true,
    user: databaseConfig.getDatabaseUser(),
    password: databaseConfig.getDatabasePassword(),
    port: databaseConfig.getDatabasePort(),
    queueLimit: 50,
    stringifyObjects: false,
    supportBigNumbers: false,
    trace: !isProduction,
    timezone: 'local',
    typeCast: true,
    waitForConnections: true,
  });
};

export default mysqlRawOptions;
