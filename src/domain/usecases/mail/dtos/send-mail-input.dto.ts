export class SendMailInputDto {
  to: string;
  subject: string;
  html: string;
  text: string;
  from: string;
  apiKey: string;
  service: string;
}
