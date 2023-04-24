import { mock, MockProxy } from 'jest-mock-extended';
import SendMailUseCase from '../send-mail.use-case';
import SendGridMailInterface from '../../../../app/shared/interfaces/sendgrid-mail.interface';
import { SendMailInputDto } from '../dtos/send-mail-input.dto';

describe('Send Mail Use Case', () => {
  let sendGridMail: MockProxy<SendGridMailInterface> | null = null;

  beforeEach(() => {
    sendGridMail = mock<SendGridMailInterface>();
  });

  it('should send an email', async () => {
    const inputMock: SendMailInputDto = {
      to: 'test@domain.com',
      from: 'sender@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const sendMailMock = sendGridMail.sendMail.mockResolvedValueOnce(null);

    const useCase = new SendMailUseCase(sendGridMail);

    const result = await useCase.execute(inputMock);

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);
    expect.assertions(2);
  });

  it('should throw an error when input is invalid - to is null', async () => {
    const inputMock: SendMailInputDto = {
      to: null,
      from: 'sender@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - to is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: undefined,
      from: 'sender@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - from is null', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: null,
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - from is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: undefined,
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - subject is null', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: null,
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - subject is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: undefined,
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - text is null', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: null,
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - text is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: undefined,
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - html is null', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: 'Test',
      html: null,
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - html is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: 'Test',
      html: undefined,
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - apiKey is null', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: null,
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - apiKey is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: undefined,
      service: 'sendgrid',
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - service is null', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: null,
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - service is undefined', async () => {
    const inputMock: SendMailInputDto = {
      to: 'sender@domain.com',
      from: 'test@domain.com',
      subject: 'Test',
      text: 'Test',
      html: '<h1>Test</h1>',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: undefined,
    };

    const useCase = new SendMailUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });
});
