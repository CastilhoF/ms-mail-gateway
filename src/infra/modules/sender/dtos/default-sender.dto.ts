import { ApiProperty } from '@nestjs/swagger';
import SenderFieldsDocumentation from '../documentation/sender-fields.documentation';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class DefaultSenderDto {
  @IsUUID(4)
  @Expose({ name: 'uid' })
  @ApiProperty(SenderFieldsDocumentation.uid)
  uid: string;

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
  @Expose({ name: 'senderApiKey' })
  @ApiProperty(SenderFieldsDocumentation.senderApiKey)
  senderApiKey: string;

  @IsBoolean()
  @Expose({ name: 'validated' })
  @ApiProperty(SenderFieldsDocumentation.validated)
  validated: boolean;

  @IsUUID(4)
  @Expose({ name: 'client_uid' })
  @ApiProperty(SenderFieldsDocumentation.clientUid)
  clientUid: string;

  @Expose({ name: 'created_at' })
  @ApiProperty(SenderFieldsDocumentation.createdAt)
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @ApiProperty(SenderFieldsDocumentation.updatedAt)
  updatedAt: Date;

  constructor(
    uid: string,
    name: string,
    email: string,
    service: string,
    senderApiKey: string,
    validated: boolean,
    clientUid: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.service = service;
    this.senderApiKey = senderApiKey;
    this.validated = validated;
    this.clientUid = clientUid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
