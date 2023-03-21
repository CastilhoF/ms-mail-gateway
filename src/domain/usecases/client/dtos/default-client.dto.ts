export class DefaultClientDto {
  readonly uid: string;
  readonly host: string;
  readonly client: string;
  readonly apiKey: string;
  readonly apiSecret: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    uid: string,
    host: string,
    client: string,
    apiKey: string,
    apiSecret: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.uid = uid;
    this.host = host;
    this.client = client;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
