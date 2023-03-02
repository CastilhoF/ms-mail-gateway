import { HttpModuleAsyncOptions } from '@nestjs/axios';
import HttpOptions from '../http.options';

const httpProvider: HttpModuleAsyncOptions = {
  useClass: HttpOptions,
};

export default httpProvider;
