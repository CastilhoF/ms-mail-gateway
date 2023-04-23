export class SendGridSendMailInputDto {
  to: string;
  from: string;
  subject: string;
  html: string;
  apiKey: string;
}
