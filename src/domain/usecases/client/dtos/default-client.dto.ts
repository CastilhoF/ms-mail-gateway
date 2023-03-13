export class DefaultClientDto {
  readonly id: string;
  readonly host: string;
  readonly client: string;
  readonly apiKey: string;
  readonly apiSecret: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    host: string,
    client: string,
    apiKey: string,
    apiSecret: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.host = host;
    this.client = client;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
