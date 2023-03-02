abstract class BaseEntity {
  private _id?: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}

export default BaseEntity;
