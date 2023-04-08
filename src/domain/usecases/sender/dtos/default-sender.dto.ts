export class DefaultSenderDto {
  readonly uid: string;
  readonly name: string;
  readonly email: string;
  readonly service: string;
  readonly senderApiKey: string;
  readonly validated: boolean;
  readonly clientUid: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

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
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.service = service;
    this.senderApiKey = senderApiKey;
    this.validated = validated;
    this.clientUid = clientUid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
