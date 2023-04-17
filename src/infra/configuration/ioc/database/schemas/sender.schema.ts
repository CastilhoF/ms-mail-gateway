import { SchemaFactory } from '@nestjs/mongoose';
import SenderModel from '../../../../modules/database/models/sender-model';

export type SenderDocument = SenderModel & Document;
const SenderSchema = SchemaFactory.createForClass(SenderModel);
export { SenderSchema };

export const senderSchemaOptions = {
  name: SenderModel.name,
  schema: SenderSchema,
};
