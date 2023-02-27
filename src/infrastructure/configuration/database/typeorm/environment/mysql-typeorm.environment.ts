import DatabaseEnvironment from '../../base/environment/database.environment';

class MysqlTypeOrmEnvironment extends DatabaseEnvironment {
  getDatabaseSynchronize(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }
}

export default MysqlTypeOrmEnvironment;
