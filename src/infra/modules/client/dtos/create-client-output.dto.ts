import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';

export class CreateClientOutputDto {
  @IsUUID()
  @IsNotEmpty()
  @Expose({ name: 'id' })
  @ApiProperty(ClientFieldsDocumentation.id)
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'host' })
  @ApiProperty(ClientFieldsDocumentation.host)
  readonly host: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'client' })
  @ApiProperty(ClientFieldsDocumentation.client)
  readonly client: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_key' })
  @ApiProperty(ClientFieldsDocumentation.apiKey)
  readonly apiKey: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_secret' })
  @ApiProperty(ClientFieldsDocumentation.apiSecret)
  readonly apiSecret: string;

  @IsNotEmpty()
  @IsDate()
  @Expose({ name: 'created_at' })
  @ApiProperty(ClientFieldsDocumentation.createdAt)
  readonly createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @Expose({ name: 'updated_at' })
  @ApiProperty(ClientFieldsDocumentation.updatedAt)
  readonly updatedAt: Date;

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
