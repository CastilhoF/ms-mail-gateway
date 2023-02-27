import { ConfigurableModuleBuilder } from '@nestjs/common';

export const CONNECTION_POOL = 'CONNECTION_POOL';

export const { ConfigurableModuleClass: ConfigurableDatabaseModule } =
  new ConfigurableModuleBuilder<any>().setClassMethodName('forRoot').build();
