import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { schemaConfig } from '../../../configuration/ioc/database/schemas/configuration/schema.config';
import ClientEntity from '../../../../domain/entities/client/client.entity';

@Schema(schemaConfig('client'))
class ClientModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  host: string;

  @Prop({ required: true, unique: true, index: true })
  client: string;

  @Prop({ required: true, unique: false, index: false })
  api_key: string;

  @Prop({ required: true, unique: false, index: false })
  api_secret: string;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;

  constructor(entity: ClientEntity) {
    this._id = entity.id ? new Types.ObjectId(entity.id) : undefined;
    this.host = entity.host;
    this.client = entity.client;
    this.api_key = entity.apiKey;
    this.api_secret = entity.apiSecret;
    this.created_at = entity.createdAt;
    this.updated_at = entity.updatedAt;
  }
}

export default ClientModel;
