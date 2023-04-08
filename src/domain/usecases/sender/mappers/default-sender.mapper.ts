import { DefaultSenderDto } from '../dtos/default-sender.dto';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';

class DefaultSenderMapper {
  static toDto(entity: SenderEntity): DefaultSenderDto {
    return {
      uid: entity.uid,
      name: entity.name,
      email: entity.email,
      service: entity.service,
      senderApiKey: entity.senderApiKey,
      validated: entity.validated,
      clientUid: entity.clientUid,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(dto: DefaultSenderDto): SenderEntity {
    return new SenderEntity(
      dto.uid,
      dto.name,
      dto.email,
      dto.service,
      dto.senderApiKey,
      dto.validated,
      dto.clientUid,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

export default DefaultSenderMapper;
