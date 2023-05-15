import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class MailEnvironment {
  constructor(protected configService: ConfigService) {}

  getTemplatePath(): string {
    return this.configService.get<string>('TEMPLATE_PATH');
  }
}

export default MailEnvironment;
