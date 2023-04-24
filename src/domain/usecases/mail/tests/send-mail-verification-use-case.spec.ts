import { mock, MockProxy } from 'jest-mock-extended';
import SendMailVerificationUseCase from '../send-mail-verification.use-case';
import SendGridMailInterface from '../../../../app/shared/interfaces/sendgrid-mail.interface';
import { SendMailVerificationInputDto } from '../dtos/send-mail-verification-input.dto';

describe('Send Mail Verification Use Case', () => {
  let sendGridMail: MockProxy<SendGridMailInterface> | null = null;

  beforeEach(() => {
    sendGridMail = mock<SendGridMailInterface>();
  });

  it('should send an email', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: 'sender@domain.com',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const sendMailMock = sendGridMail.verifyEmail.mockResolvedValueOnce(null);

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    const result = await useCase.execute(inputMock);

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);
    expect.assertions(2);
  });

  it('should throw an error when input is invalid - email is null', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: null,
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - email is undefined', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: undefined,
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: 'sendgrid',
    };

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - apiKey is null', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: 'test@domain.com',
      apiKey: null,
      service: 'sendgrid',
    };

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - apiKey is undefined', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: 'test@domain.com',
      apiKey: undefined,
      service: 'sendgrid',
    };

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - service is null', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: 'test@domain.com',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: null,
    };

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });

  it('should throw an error when input is invalid - service is undefined', async () => {
    const inputMock: SendMailVerificationInputDto = {
      email: 'test@domain.com',
      apiKey: '71f97782-f5ea-42bf-8c04-50a69379ddd4',
      service: undefined,
    };

    const useCase = new SendMailVerificationUseCase(sendGridMail);

    await expect(useCase.execute(inputMock)).rejects.toThrowError();
  });
});
