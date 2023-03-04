import { CreateClientOutputDto } from '../dtos/create-client-output.dto';
import { CreateClientMapperInputDto } from '../dtos/create-client-mapper-input.dto';
import ClientEntity from '../../../../domain/entities/client/client.entity';

class CreateClientMapper {
  static toEntity(input: CreateClientMapperInputDto): ClientEntity {
    return new ClientEntity(
      '',
      input.host,
      input.client,
      input.apiKey,
      input.apiSecret,
      new Date(),
      new Date(),
    );
  }

  static toOutputDto(entity: ClientEntity): CreateClientOutputDto {
    return {
      id: entity.id,
      host: entity.host,
      client: entity.client,
      apiKey: entity.apiKey,
      apiSecret: entity.apiSecret,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

export default CreateClientMapper;
