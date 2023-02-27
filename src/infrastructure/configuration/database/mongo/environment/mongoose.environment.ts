import DatabaseEnvironment from '../../base/environment/database.environment';

class MongooseEnvironment extends DatabaseEnvironment {
  getDatabaseProtocol(): boolean {
    return this.configService.get<boolean>('DATABASE_PROTOCOL');
  }
}

export default MongooseEnvironment;
