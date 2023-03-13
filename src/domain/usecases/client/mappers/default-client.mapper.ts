import { DefaultClientDto } from '../dtos/default-client.dto';
import ClientEntity from '../../../../domain/entities/client/client.entity';

class DefaultClientMapper {
  static toDto(entity: ClientEntity): DefaultClientDto {
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

  static toEntity(dto: DefaultClientDto): ClientEntity {
    return new ClientEntity(
      dto.id,
      dto.host,
      dto.client,
      dto.apiKey,
      dto.apiSecret,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default DefaultClientMapper;
