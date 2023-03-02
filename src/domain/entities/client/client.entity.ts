import BaseEntity from '../base.entity';
import DomainException from '../shared/exceptions/domain.exception';

class ClientEntity extends BaseEntity {
  private _host: string;
  private _client: string;
  private _apiKey: string;
  private _apiSecret: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    host: string,
    client: string,
    apiKey: string,
    apiSecret: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id);
    this._host = host;
    this._client = client;
    this._apiKey = apiKey;
    this._apiSecret = apiSecret;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

    this.validate();
  }

  private validateHost(apiHost: string): boolean {
    if (!apiHost) {
      throw new DomainException('apiHost is required');
    }
    return true;
  }

  private validateClient(apiClient: string): boolean {
    if (!apiClient) {
      throw new DomainException('apiClient is required');
    }
    return true;
  }

  private validateApiKey(apiKey: string): boolean {
    if (!apiKey) {
      throw new DomainException('apiKey is required');
    }
    return true;
  }

  private validateApiSecret(apiSecret: string): boolean {
    if (!apiSecret) {
      throw new DomainException('apiSecret is required');
    }
    return true;
  }

  private validateCreatedAt(createdAt: Date): boolean {
    if (!createdAt) {
      throw new DomainException('createdAt is required');
    }
    return true;
  }

  private validateUpdatedAt(updatedAt: Date): boolean {
    if (!updatedAt) {
      throw new DomainException('updatedAt is required');
    }
    return true;
  }

  private validate(): boolean {
    this.validateHost(this._host);
    this.validateClient(this._client);
    this.validateApiKey(this._apiKey);
    this.validateApiSecret(this._apiSecret);
    this.validateCreatedAt(this._createdAt);
    this.validateUpdatedAt(this._updatedAt);

    return true;
  }

  get host(): string {
    return this._host;
  }

  set host(host: string) {
    this.validateHost(host);
    this._host = host;
  }

  get client(): string {
    return this._client;
  }

  set client(client: string) {
    this.validateClient(client);
    this._client = client;
  }

  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(apiKey: string) {
    this.validateApiKey(apiKey);
    this._apiKey = apiKey;
  }

  get apiSecret(): string {
    return this._apiSecret;
  }

  set apiSecret(apiSecret: string) {
    this.validateApiSecret(apiSecret);
    this._apiSecret = apiSecret;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this.validateCreatedAt(createdAt);
    this._createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.validateUpdatedAt(updatedAt);
    this._updatedAt = updatedAt;
  }
}

export default ClientEntity;
