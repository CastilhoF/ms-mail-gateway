import { SchemaOptions } from 'mongoose';

export const schemaConfig = (collectionName: string) => {
  return {
    _id: true,
    autoCreate: true,
    autoIndex: true,
    collection: collectionName,
    toObject: {
      depopulate: true,
      flattenMaps: true,
      transform: true,
      versionKey: false,
    },
    toJSON: {
      depopulate: true,
      flattenMaps: true,
      transform: true,
      versionKey: false,
    },
    timestamps: true,
    validateBeforeSave: true,
    versionKey: false,
  } as SchemaOptions;
};
