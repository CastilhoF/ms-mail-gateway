import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendGridVerifyMailInputDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose({ name: 'email' })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_key' })
  @ApiProperty()
  apiKey: string;
}
