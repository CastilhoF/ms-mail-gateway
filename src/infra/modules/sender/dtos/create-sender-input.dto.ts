import { ApiProperty } from '@nestjs/swagger';
import SenderFieldsDocumentation from '../documentation/sender-fields.documentation';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateSenderInputDto {
  @IsString()
  @Expose({ name: 'name' })
  @ApiProperty(SenderFieldsDocumentation.senderName)
  name: string;

  @IsString()
  @Expose({ name: 'email' })
  @ApiProperty(SenderFieldsDocumentation.email)
  email: string;

  @IsString()
  @Expose({ name: 'service' })
  @ApiProperty(SenderFieldsDocumentation.service)
  service: string;

  @IsString()
  @Expose({ name: 'sender_api_key' })
  @ApiProperty(SenderFieldsDocumentation.senderApiKey)
  senderApiKey: string;

  @IsUUID(4)
  @Expose({ name: 'client_uid' })
  @ApiProperty(SenderFieldsDocumentation.clientUid)
  clientUid: string;

  constructor(
    name: string,
    email: string,
    service: string,
    senderApiKey: string,
    clientUid: string,
  ) {
    this.name = name;
    this.email = email;
    this.service = service;
    this.senderApiKey = senderApiKey;
    this.clientUid = clientUid;
  }
}
