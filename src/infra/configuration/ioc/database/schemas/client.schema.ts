import { SchemaFactory } from '@nestjs/mongoose';
import ClientModel from '../../../../modules/database/models/client-model';

export type ClientDocument = ClientModel & Document;
const ClientSchema = SchemaFactory.createForClass(ClientModel);
export { ClientSchema };

export const clientSchemaOptions = {
  name: ClientModel.name,
  schema: ClientSchema,
};
