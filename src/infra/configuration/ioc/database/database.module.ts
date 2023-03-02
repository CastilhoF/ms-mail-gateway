import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import MongooseProvider from './provider/mongoose.provider';

@Global()
@Module({
  imports: [MongooseModule.forRootAsync(MongooseProvider)],
  providers: [],
  exports: [],
})
class DatabaseModule extends ConfigurableModuleClass {}

export default DatabaseModule;
