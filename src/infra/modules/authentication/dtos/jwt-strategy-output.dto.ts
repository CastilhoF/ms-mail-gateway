import { ApiProperty } from '@nestjs/swagger';
import JwtStrategyFieldsDocumentation from '../documentation/jwt-strategy-fields.documentation';
import JwtStrategyDtosDocumentation from '../documentation/jwt-strategy-dtos.documentation';

export class SenderInformationDto {
  @ApiProperty(JwtStrategyFieldsDocumentation.email)
  readonly email: string;

  @ApiProperty(JwtStrategyFieldsDocumentation.senderApiKey)
  readonly apiKey: string;

  @ApiProperty(JwtStrategyFieldsDocumentation.validated)
  readonly validated: boolean;

  constructor(email?: string, apiKey?: string, validated?: boolean) {
    this.email = email;
    this.apiKey = apiKey;
    this.validated = validated;
  }
}

export class JwtStrategyOutputDto {
  @ApiProperty(JwtStrategyFieldsDocumentation.client)
  readonly client: string;

  @ApiProperty(JwtStrategyFieldsDocumentation.host)
  readonly host: string;

  @ApiProperty(JwtStrategyFieldsDocumentation.apiKey)
  readonly apiKey: string;

  @ApiProperty(JwtStrategyDtosDocumentation.senderInformation)
  readonly senderInformation: SenderInformationDto;

  constructor(
    client: string,
    host: string,
    apiKey: string,
    senderInformation: SenderInformationDto,
  ) {
    this.client = client;
    this.host = host;
    this.apiKey = apiKey;
    this.senderInformation = senderInformation;
  }
}
