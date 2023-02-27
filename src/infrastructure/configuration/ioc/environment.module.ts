import { Module } from '@nestjs/common';
import ApplicationEnvironment from '../environment/base/application.environment';
import MongooseEnvironment from '../database/mongo/environment/mongoose.environment';

@Module({
  imports: [],
  providers: [ApplicationEnvironment, MongooseEnvironment],
  exports: [ApplicationEnvironment, MongooseEnvironment],
})
export class EnvironmentModule {}
