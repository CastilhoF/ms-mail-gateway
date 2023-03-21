import EnvironmentEntity from '../../environment/entity/environment.entity';
import ApplicationInterface from '../../environment/base/application.interface';
import MongooseEnvironment from './environment/mongoose.environment';

const MongooseOptions = (
  applicationConfig: ApplicationInterface,
  databaseConfig: MongooseEnvironment,
) => {
  const isProduction =
    applicationConfig.getNodeEnv() === EnvironmentEntity.PRODUCTION;

  const protocol = `${databaseConfig.getDatabaseProtocol()}`;
  const host = databaseConfig.getDatabaseHost();
  const port = databaseConfig.getDatabasePort();

  let uri = `${protocol}://${host}`;

  if (protocol === 'mongodb') uri += `:${port}`;

  return {
    appName: applicationConfig.getAppName(),
    autoCreate: !isProduction,
    autoIndex: !isProduction,
    connectTimeoutMS: 5000,
    dbName: databaseConfig.getDatabaseName(),
    enableUtf8Validation: true,
    heartbeatFrequencyMS: 30000,
    keepAlive: true,
    keepAliveInitialDelay: 5000,
    loggerLevel: isProduction ? 'error' : 'debug',
    minPoolSize: 5,
    maxPoolSize: 100,
    pass: databaseConfig.getDatabasePassword(),
    socketTimeoutMS: 30000,
    uri: uri,
    user: databaseConfig.getDatabaseUser(),
  };
};

export default MongooseOptions;
