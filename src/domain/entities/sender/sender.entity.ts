import BaseEntity from '../base.entity';
import DomainException from '../shared/exceptions/domain.exception';
import Normalizer from '../../../domain/shared/normalization/normalizer';

class SenderEntity extends BaseEntity {
  private _name: string;
  private _email: string;
  private _service: string;
  private _senderApiKey: string;
  private _validated: boolean;
  private _clientUid: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    uid: string,
    name: string,
    email: string,
    service: string,
    senderApiKey: string,
    validated: boolean,
    clientUid: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(uid);
    this._name = name;
    this._email = email;
    this._service = service;
    this._senderApiKey = senderApiKey;
    this._validated = validated;
    this._clientUid = clientUid;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

    this.validate();
  }

  private validateName(name: string): boolean {
    if (!name) {
      throw new DomainException('name is required');
    }
    return true;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim().length === 0) {
      throw new DomainException('email is required');
    }

    if (!emailRegex.test(email)) {
      throw new DomainException('email is not valid');
    }

    return true;
  }

  private validateApiKey(senderApiKey: string): boolean {
    if (!senderApiKey) {
      throw new DomainException('senderApiKey is required');
    }
    return true;
  }

  private validateService(service: string): boolean {
    if (!service) {
      throw new DomainException('service is required');
    }
    return true;
  }

  private validateValidated(validated: boolean): boolean {
    if (validated === undefined || validated === null) {
      throw new DomainException('validated is required');
    }
    return true;
  }

  private validateClientUid(clientUid: string): boolean {
    if (!clientUid) {
      throw new DomainException('clientUid is required');
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

  private validate(): void {
    this.validateName(this._name);
    this.validateEmail(this._email);
    this.validateService(this._service);
    this.validateApiKey(this._senderApiKey);
    this.validateValidated(this._validated);
    this.validateClientUid(this._clientUid);
    this.validateCreatedAt(this._createdAt);
    this.validateUpdatedAt(this._updatedAt);
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this.validateName(name);
    this._name = Normalizer.normalizeSender(name);
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this.validateEmail(email);
    this._email = email;
  }

  get service(): string {
    return this._service;
  }

  set service(service: string) {
    this.validateService(service);
    this._service = Normalizer.normalizeSender(service);
  }

  get senderApiKey(): string {
    return this._senderApiKey;
  }

  set senderApiKey(senderApiKey: string) {
    this.validateApiKey(senderApiKey);
    this._senderApiKey = senderApiKey;
  }

  get validated(): boolean {
    return this._validated;
  }

  set validated(validated: boolean) {
    this.validateValidated(validated);
    this._validated = validated;
  }

  get clientUid(): string {
    return this._clientUid;
  }

  set clientUid(clientUid: string) {
    this.validateClientUid(clientUid);
    this._clientUid = clientUid;
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

export default SenderEntity;
