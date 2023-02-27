import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import MongooseOptions from '../../../database/mongo/mongoose.options';
import ApplicationEnvironment from '../../../environment/base/application.environment';
import { EnvironmentModule } from '../../environment.module';
import MongooseEnvironment from '../../../database/mongo/environment/mongoose.environment';

const MongooseProvider: MongooseModuleAsyncOptions = {
  imports: [EnvironmentModule],
  useFactory: MongooseOptions,
  inject: [ApplicationEnvironment, MongooseEnvironment],
};

export default MongooseProvider;
