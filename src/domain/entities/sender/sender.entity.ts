import BaseEntity from '../base.entity';
import DomainException from '../shared/exceptions/domain.exception';

class SenderEntity extends BaseEntity {
  private _name: string;
  private _email: string;
  private _apiKey: string;
  private _validated: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    apiKey: string,
    validated: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id);
    this._name = name;
    this._email = email;
    this._apiKey = apiKey;
    this._validated = validated;
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
    
    if (!email) {
      throw new DomainException('email is required');
    }

    if (emailRegex.test(email)) {
      throw new DomainException('email is not valid');
    }

    return true;
  }

  private validateApiKey(apiKey: string): boolean {
    if (!apiKey) {
      throw new DomainException('apiKey is required');
    }
    return true;
  }

  private validateValidated(validated: boolean): boolean {
    if (!validated) {
      throw new DomainException('validated is required');
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
    this.validateApiKey(this._apiKey);
    this.validateValidated(this._validated);
    this.validateCreatedAt(this._createdAt);
    this.validateUpdatedAt(this._updatedAt);
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this.validateName(name);
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this.validateEmail(email);
    this._email = email;
  }

  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(apiKey: string) {
    this.validateApiKey(apiKey);
    this._apiKey = apiKey;
  }

  get validated(): boolean {
    return this._validated;
  }

  set validated(validated: boolean) {
    this.validateValidated(validated);
    this._validated = validated;
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
