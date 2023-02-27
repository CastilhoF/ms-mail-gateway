import EnvironmentEntity from '../entity/environment.entity';

abstract class ApplicationInterface {
  abstract getAppName(): string;
  abstract getAppHost(): string;
  abstract getAppPort(): number;
  abstract getNodeEnv(): EnvironmentEntity;
}

export default ApplicationInterface;
