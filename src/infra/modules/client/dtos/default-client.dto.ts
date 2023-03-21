import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';

export class DefaultClientDto {
  @IsUUID()
  @IsNotEmpty()
  @Expose({ name: 'id' })
  @ApiProperty(ClientFieldsDocumentation.id)
  id: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'host' })
  @ApiProperty(ClientFieldsDocumentation.host)
  host: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'client' })
  @ApiProperty(ClientFieldsDocumentation.client)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_key' })
  @ApiProperty(ClientFieldsDocumentation.apiKey)
  apiKey: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_secret' })
  @ApiProperty(ClientFieldsDocumentation.apiSecret)
  apiSecret: string;

  @IsNotEmpty()
  @IsDate()
  @Expose({ name: 'created_at' })
  @ApiProperty(ClientFieldsDocumentation.createdAt)
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @Expose({ name: 'updated_at' })
  @ApiProperty(ClientFieldsDocumentation.updatedAt)
  updatedAt: Date;

  constructor(
    id: string,
    host: string,
    client: string,
    apiKey: string,
    apiSecret: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.host = host;
    this.client = client;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
