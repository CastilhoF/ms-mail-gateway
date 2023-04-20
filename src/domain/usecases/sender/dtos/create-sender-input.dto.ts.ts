export class CreateSenderInputDto {
  readonly name: string;
  readonly email: string;
  readonly service: string;
  readonly senderApiKey: string;
  readonly clientUid: string;

  constructor(
    name: string,
    email: string,
    service: string,
    senderApiKey: string,
    clientUid: string,
  ) {
    this.name = name;
    this.email = email;
    this.service = service;
    this.senderApiKey = senderApiKey;
    this.clientUid = clientUid;
  }
}
