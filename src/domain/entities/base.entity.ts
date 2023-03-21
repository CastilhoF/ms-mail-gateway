abstract class BaseEntity {
  private _uid?: string;

  constructor(uid: string) {
    this._uid = uid;
  }

  get uid(): string {
    return this._uid;
  }

  set uid(uid: string) {
    this._uid = uid;
  }
}

export default BaseEntity;
