import { ApiPropertyOptions } from '@nestjs/swagger';
import { SenderInformationDto } from '../dtos/jwt-strategy-output.dto';

class JwtStrategyDtosDocumentation {
  public static senderInformation: ApiPropertyOptions = {
    name: 'senderInformation',
    title: 'Sender Information',
    description: 'Sender Information',
    example: {
      email: 'client@domain.com',
      apiKey: '0x00000',
      validated: true,
    },
    isArray: false,
    type: () => SenderInformationDto,
  };
}

export default JwtStrategyDtosDocumentation;
