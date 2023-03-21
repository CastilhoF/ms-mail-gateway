import { instanceToPlain } from 'class-transformer';
import ClientModel from '../../database/models/client-model';
import ClientEntity from '../../../../domain/entities/client/client.entity';

class ClientModelMapper {
  public static toEntity(model: ClientModel): ClientEntity {
    return new ClientEntity(
      model.uid,
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
      uid: entity?.uid,
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
