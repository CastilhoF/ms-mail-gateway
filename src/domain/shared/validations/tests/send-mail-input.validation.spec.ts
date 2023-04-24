import SendMailInputValidation from '../send-mail-input.validation';
import DomainException from '../../../entities/shared/exceptions/domain.exception';

describe('SendMailInputValidation', () => {
  let sendMailInputValidation: SendMailInputValidation;
  const to = 'test@domain.com';
  const subject = 'Test';
  const html = '<h1>Test</h1>';
  const text = 'Test';
  const from = 'sender@domain.com';
  const apiKey = '71f97782-f5ea-42bf-8c04-50a69379ddd4';
  const service = 'sendgrid';

  beforeEach(() => {
    sendMailInputValidation = new SendMailInputValidation();
  });

  it('should throw an exception when "to" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to: null,
      from,
      subject,
      text,
      html,
      apiKey,
      service,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('To is required'),
    );
    expect.assertions(1);
  });

  it('should throw an exception when "from" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to,
      from: null,
      subject,
      text,
      html,
      apiKey,
      service,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('From is required'),
    );
    expect.assertions(1);
  });

  it('should throw an exception when "subject" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to,
      from,
      subject: null,
      text,
      html,
      apiKey,
      service,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('Subject is required'),
    );
    expect.assertions(1);
  });

  it('should throw an exception when "text" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to,
      from,
      subject,
      text: null,
      html,
      apiKey,
      service,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('Text is required'),
    );
    expect.assertions(1);
  });

  it('should throw an exception when "html" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to,
      from,
      subject,
      text,
      html: null,
      apiKey,
      service,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('Html is required'),
    );
    expect.assertions(1);
  });

  it('should throw an exception when "apiKey" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to,
      from,
      subject,
      text,
      html,
      apiKey: null,
      service,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('Api Key is required'),
    );
    expect.assertions(1);
  });

  it('should throw an exception when "service" is not passed', async () => {
    const promise = sendMailInputValidation.validate({
      to,
      from,
      subject,
      text,
      html,
      apiKey,
      service: null,
    });

    await expect(promise).rejects.toThrowError(
      new DomainException('Service is required'),
    );
    expect.assertions(1);
  });

  it('should valid payload and send email', async () => {
    const result = await sendMailInputValidation.validate({
      to,
      from,
      subject,
      text,
      html,
      apiKey,
      service,
    });

    expect(result).toBe(true);
  });
});
