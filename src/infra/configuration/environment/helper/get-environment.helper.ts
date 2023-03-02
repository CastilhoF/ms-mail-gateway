import EnvironmentEntity from '../entity/environment.entity';
import EnvironmentFileEntity from '../entity/environment-file.entity';

const getEnvironment = () => {
  const environment = process.env.NODE_ENV;

  switch (environment) {
    case EnvironmentEntity.LOCAL:
      return EnvironmentFileEntity.DEVELOPMENT_LOCAL;
    case EnvironmentEntity.DEVELOPMENT:
      return EnvironmentFileEntity.DEVELOPMENT_SERVER;
    case EnvironmentEntity.TESTING:
      return EnvironmentFileEntity.TESTING;
    case EnvironmentEntity.PRODUCTION:
      return EnvironmentFileEntity.PRODUCTION;
  }
};

export { getEnvironment };
