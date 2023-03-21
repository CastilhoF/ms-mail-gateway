import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';

export class CreateClientInputDto {
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
  @Expose({ name: 'api_secret' })
  @ApiProperty(ClientFieldsDocumentation.apiSecret)
  readonly apiSecret: string;
}
