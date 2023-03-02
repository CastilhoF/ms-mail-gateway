import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

interface CustomValidationInterface extends ValidatorOptions {
  always: boolean;
  disableErrorMessages: boolean;
  dismissDefaultMessages: boolean;
  enableDebugMessages: boolean;
  errorHttpStatusCode: number;
  exceptionFactory?: (errors: ValidationError[]) => any;
  forbidNonWhitelisted: boolean;
  forbidUnknownValues: boolean;
  groups?: string[];
  strictGroups?: boolean;
  skipMissingProperties: boolean;
  skipNullProperties: boolean;
  skipUndefinedProperties: boolean;
  stopAtFirstError: boolean;
  'validationError.target': boolean;
  'validationError.value': boolean;
  whitelist: boolean;
}

export default CustomValidationInterface;
