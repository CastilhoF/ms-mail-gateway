import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';

export class ChangeClientApiSecretInputDto {
  @IsUUID()
  @IsNotEmpty()
  @Expose({ name: 'id' })
  @ApiProperty(ClientFieldsDocumentation.id)
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'api_secret' })
  @ApiProperty(ClientFieldsDocumentation.apiSecret)
  readonly apiSecret: string;
}
