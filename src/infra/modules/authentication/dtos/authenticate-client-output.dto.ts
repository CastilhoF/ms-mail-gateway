import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import AuthenticationFieldsDocumentation from '../documentation/authentication-fields.documentation';

export class AuthenticateClientOutputDto {
  @IsString()
  @Expose({ name: 'access_token' })
  @ApiProperty(AuthenticationFieldsDocumentation.accessToken)
  readonly accessToken: string;
}
