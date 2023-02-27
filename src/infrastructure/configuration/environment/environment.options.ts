import { ConfigModuleOptions } from '@nestjs/config';
import { getEnvironment } from './helper/get-environment.helper';
import environmentValidation from './helper/environment.validation';

const environmentOptions: ConfigModuleOptions = {
  cache: true,
  encoding: 'utf8',
  envFilePath: getEnvironment(),
  expandVariables: true,
  ignoreEnvFile: false,
  ignoreEnvVars: false,
  isGlobal: true,
  load: undefined,
  validationSchema: environmentValidation(),
};

export default environmentOptions;
