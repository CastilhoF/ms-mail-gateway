export class SendGridSendMailInputDto {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  apiKey: string;
}
