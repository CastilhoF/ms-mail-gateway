import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Injectable } from '@nestjs/common';
import ApplicationEnvironment from '../environment/base/application.environment';
import SwaggerConstants from './swagger.constants';

@Injectable()
class SwaggerOptions {
  constructor(private readonly applicationService: ApplicationEnvironment) {}

  readonly prefix = this.applicationService.getGlobalPrefix();

  setup(app: INestApplication) {
    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(SwaggerConstants.title())
      .setDescription(SwaggerConstants.text())
      .setVersion(SwaggerConstants.version())
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${this.prefix}/api`, app, document);
  }
}

export default SwaggerOptions;
