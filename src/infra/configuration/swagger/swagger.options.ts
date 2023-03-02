import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Injectable } from '@nestjs/common';
import ApplicationEnvironment from '../environment/base/application.environment';

@Injectable()
class SwaggerOptions {
  constructor(private readonly applicationService: ApplicationEnvironment) {}

  setup(app: INestApplication) {
    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(this.applicationService.getAppName())
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('music-pro')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}

export default SwaggerOptions;
