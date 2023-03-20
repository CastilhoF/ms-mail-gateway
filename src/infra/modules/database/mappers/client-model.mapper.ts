import { instanceToPlain } from 'class-transformer';
import ClientModel from '../../database/models/client-model';
import ClientEntity from '../../../../domain/entities/client/client.entity';
import { Types } from 'mongoose';

class ClientModelMapper {
  public static toEntity(model: ClientModel): ClientEntity {
    const id = model._id?.toString();

    return new ClientEntity(
      id,
      model.host,
      model.client,
      model.api_key,
      model.api_secret,
      model.created_at,
      model.updated_at,
    );
  }

  public static toModel(entity: ClientEntity): ClientModel {
    return new ClientModel(entity);
  }

  public static partialEntityToPartialModel(
    entity: Partial<ClientEntity>,
  ): Partial<ClientModel> {
    const clientModel: Partial<ClientModel> = {
      _id: new Types.ObjectId(entity?.id),
      host: entity?.host,
      client: entity?.client,
      api_key: entity?.apiKey,
      api_secret: entity?.apiSecret,
      created_at: entity?.createdAt,
      updated_at: entity?.updatedAt,
    };

    return instanceToPlain(clientModel, {
      exposeUnsetFields: false,
      enableImplicitConversion: false,
      excludeExtraneousValues: true,
    });
  }
}

export default ClientModelMapper;
