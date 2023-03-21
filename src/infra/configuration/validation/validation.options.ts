import { HttpStatus, PipeTransform, ValidationPipe } from '@nestjs/common';
import CustomValidationInterface from './interface/validation.interface';
import EnvironmentFileEntity from '../environment/entity/environment-file.entity';
import { getEnvironment } from '../environment/helper/get-environment.helper';

const validationGlobalPipe = (): PipeTransform => {
  const isEnableDebugMessages =
    getEnvironment() !== EnvironmentFileEntity.PRODUCTION;

  const options: CustomValidationInterface = {
    always: true,
    disableErrorMessages: false,
    dismissDefaultMessages: true,
    enableDebugMessages: isEnableDebugMessages,
    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    skipMissingProperties: false,
    skipNullProperties: false,
    skipUndefinedProperties: false,
    stopAtFirstError: false,
    'validationError.target': true,
    'validationError.value': true,
    whitelist: true,
    transform: true,
  };

  return new ValidationPipe(options);
};

export default validationGlobalPipe;
