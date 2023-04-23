import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendGridSendMailInputDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'to' })
  to: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'from' })
  from: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'subject' })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'text' })
  text: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'html' })
  html: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'api_key' })
  apiKey: string;

  constructor(
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string,
    apiKey: string,
  ) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.html = html;
    this.apiKey = apiKey;
  }
}
