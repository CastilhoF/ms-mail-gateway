import * as Joi from 'joi';
import EnvironmentEntity from '../entity/environment.entity';

const environmentValidation = (): Joi.ObjectSchema => {
  const local = EnvironmentEntity.LOCAL;
  const development = EnvironmentEntity.DEVELOPMENT;
  const testing = EnvironmentEntity.TESTING;
  const production = EnvironmentEntity.PRODUCTION;
  const environments = [local, development, testing, production];

  return Joi.object({
    NODE_ENV: Joi.string().valid(...environments),
    APP_NAME: Joi.string().required(),
    APP_HOST: Joi.string().required(),
    APP_PORT: Joi.number().port().required(),
    APP_DESCRIPTION: Joi.string().required(),
    APP_URL: Joi.string().required(),
    APP_API_KEY: Joi.string().required(),
    APP_GLOBAL_PREFIX: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    SWAGGER_SERVER_APP_URL: Joi.string().required(),
    SWAGGER_APP_NAME: Joi.string().required(),
    CACHE_HOST: Joi.string().required(),
    CACHE_PORT: Joi.number().port().required(),
    CACHE_DATABASE_LOGICAL: Joi.number().required(),
    CACHE_TTL: Joi.number().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().port(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_SYNCRONIZE: Joi.boolean(),
    DATABASE_PROTOCOL: Joi.string(),
  });
};

export default environmentValidation;
