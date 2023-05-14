import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import SendMailFieldsDocumentation from '../documentation/send-mail-fields.documentation';

export class SendMailInputDto {
  @IsEmail()
  @Expose({ name: 'to' })
  @ApiProperty(SendMailFieldsDocumentation.to)
  to: string;

  @IsString()
  @Expose({ name: 'subject' })
  @ApiProperty(SendMailFieldsDocumentation.subject)
  subject: string;

  @IsString()
  @Expose({ name: 'html' })
  @ApiProperty(SendMailFieldsDocumentation.html)
  html: string;

  @IsString()
  @Expose({ name: 'text' })
  @ApiProperty(SendMailFieldsDocumentation.text)
  text: string;

  @IsEmail()
  @IsOptional()
  @Expose({ name: 'from' })
  @ApiProperty(SendMailFieldsDocumentation.from)
  from?: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'apiKey' })
  @ApiProperty(SendMailFieldsDocumentation.apiKey)
  apiKey?: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'service' })
  @ApiProperty(SendMailFieldsDocumentation.service)
  service?: string;
}
