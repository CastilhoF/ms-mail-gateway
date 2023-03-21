export class ExampleSchemaDto {
  readonly statusCode: number;
  readonly message: string;
  readonly error: string;
}

export class ExceptionsResponseSchemaDto {
  readonly example: ExampleSchemaDto | ExampleSchemaDto[];
}
