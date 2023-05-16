import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import SendGridSenderAuthenticationFieldsDocumentation from '../documentation/send-grid-sender-auth-fields.documentation';

export class SendGridVerifyMailInputDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose({ name: 'email' })
  @ApiProperty(SendGridSenderAuthenticationFieldsDocumentation.email)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_key' })
  @ApiProperty(SendGridSenderAuthenticationFieldsDocumentation.apiKey)
  apiKey: string;
}
