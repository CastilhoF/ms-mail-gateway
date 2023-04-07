import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import AuthenticationFieldsDocumentation from '../documentation/authentication-fields.documentation';

export class AuthenticateClientInputDto {
  @IsString()
  @Expose({ name: 'api_key' })
  @ApiProperty(AuthenticationFieldsDocumentation.apiKey)
  readonly apiKey: string;

  @IsString()
  @Expose({ name: 'api_secret' })
  @ApiProperty(AuthenticationFieldsDocumentation.apiSecret)
  readonly apiSecret: string;
}
