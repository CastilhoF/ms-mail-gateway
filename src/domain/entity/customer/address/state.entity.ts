import StateEnum from './state.enum';
import StateInvalidException from '../../exception/state-invalid.exception';
import BaseEntity from '../../base.entity';

class State extends BaseEntity {
  private _name: StateEnum;
  private _initials: string;

  constructor(name: StateEnum) {
    super();
    
    const isValid = this.nameIsValid(name);
    if (!isValid) throw new StateInvalidException(name);

    this._name = name;
    this._initials = StateEnum[name];
  }

  nameIsValid(name: StateEnum): boolean {
    return Object.values(StateEnum).includes(name);
  }

  get name(): StateEnum {
    return this._name;
  }

  set name(name: StateEnum) {
    const isValid = this.nameIsValid(name);
    if (!isValid) throw new StateInvalidException(name);

    this._name = name;
    this._initials = StateEnum[name];
  }

  get initials(): string {
    return this._initials;
  }
}

export default State;
