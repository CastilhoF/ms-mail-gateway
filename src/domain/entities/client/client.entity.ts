import BaseEntity from '../base.entity';
import Normalizer from '../../shared/normalization/normalizer';
import DomainException from '../shared/exceptions/domain.exception';

class ClientEntity extends BaseEntity {
  private _host: string;
  private _client: string;
  private _apiKey: string;
  private _apiSecret: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    uid: string,
    host: string,
    client: string,
    apiKey: string,
    apiSecret: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(uid);
    this._host = host;
    this._client = client;
    this._apiKey = apiKey;
    this._apiSecret = apiSecret;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

    this.validate();
  }

  private validateHost(host: string): boolean {
    if (!host || host === null || host === undefined) {
      throw new DomainException('Host is required');
    }
    return true;
  }

  private validateClient(apiClient: string): boolean {
    if (!apiClient || apiClient === null || apiClient === undefined) {
      throw new DomainException('Client is required');
    }
    return true;
  }

  private validateApiKey(apiKey: string): boolean {
    if (!apiKey || apiKey === null || apiKey === undefined) {
      throw new DomainException('apiKey is required');
    }
    return true;
  }

  private validateApiSecret(apiSecret: string): boolean {
    if (!apiSecret || apiSecret === null || apiSecret === undefined) {
      throw new DomainException('apiSecret is required');
    }
    return true;
  }

  private validateCreatedAt(createdAt: Date): boolean {
    if (!createdAt || createdAt === null || createdAt === undefined) {
      throw new DomainException('createdAt is required');
    }
    return true;
  }

  private validateUpdatedAt(updatedAt: Date): boolean {
    if (!updatedAt || updatedAt === null || updatedAt === undefined) {
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
    this._client = Normalizer.normalizeClient(client);
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
