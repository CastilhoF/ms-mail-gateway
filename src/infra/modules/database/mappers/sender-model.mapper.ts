import { instanceToPlain } from 'class-transformer';
import SenderModel from '../../database/models/sender-model';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';

class SenderModelMapper {
  public static toEntity(model: SenderModel): SenderEntity {
    return new SenderEntity(
      model.uid,
      model.name,
      model.email,
      model.service,
      model.sender_api_key,
      model.validated,
      model.client_uid,
      model.created_at,
      model.updated_at,
    );
  }

  public static toModel(entity: SenderEntity): SenderModel {
    return new SenderModel(entity);
  }

  public static partialEntityToPartialModel(
    entity: Partial<SenderEntity>,
  ): Partial<SenderModel> {
    const senderModel: Partial<SenderModel> = {
      uid: entity?.uid,
      name: entity?.name,
      email: entity?.email,
      service: entity?.service,
      sender_api_key: entity?.senderApiKey,
      validated: entity?.validated,
      client_uid: entity?.clientUid,
      created_at: entity?.createdAt,
      updated_at: entity?.updatedAt,
    };

    return instanceToPlain(senderModel, {
      exposeUnsetFields: false,
      enableImplicitConversion: false,
      excludeExtraneousValues: true,
    });
  }
}

export default SenderModelMapper;
