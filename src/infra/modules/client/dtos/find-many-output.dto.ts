import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import ClientsDtosDocumentation from '../documentation/clients-dtos.documentation';
import { DefaultClientDto } from './default-client.dto';

export class FindManyOutputDto {
  @IsNotEmpty()
  @Expose({ name: 'clients' })
  @ApiProperty(ClientsDtosDocumentation.entities)
  entities: DefaultClientDto[];

  @IsNotEmpty()
  @Expose({ name: 'total' })
  @ApiProperty(ClientsDtosDocumentation.total)
  total: number;
}
