import { Prop, Schema } from '@nestjs/mongoose';
import { schemaConfig } from '../../../configuration/ioc/database/schemas/configuration/schema.config';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';
import ClientModel from './client-model';

@Schema(schemaConfig('sender'))
class SenderModel {
  @Prop({ type: String, required: true, unique: true, index: true })
  uid: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true, unique: false, index: true })
  service: string;

  @Prop({ type: String, required: true, unique: false, index: false })
  sender_api_key: string;

  @Prop({ type: Boolean, required: true, unique: false, index: false })
  validated: boolean;

  @Prop({
    type: String,
    ref: ClientModel.name,
    required: true,
    unique: false,
    index: true,
  })
  client_uid: string;

  @Prop({ type: Date, required: false })
  created_at: Date;

  @Prop({ type: Date, required: false })
  updated_at: Date;

  constructor(entity: SenderEntity) {
    this.uid = entity.uid;
    this.name = entity.name;
    this.email = entity.email;
    this.service = entity.service;
    this.sender_api_key = entity.senderApiKey;
    this.validated = entity.validated;
    this.client_uid = entity.clientUid;
    this.created_at = entity.createdAt;
    this.updated_at = entity.updatedAt;
  }
}

export default SenderModel;
