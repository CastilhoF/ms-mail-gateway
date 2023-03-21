import SecretValidation from '../secret.validation';
import DomainException from '../../../entities/shared/exceptions/domain.exception';

describe('SecretValidation', () => {
  let secretValidation: SecretValidation;

  beforeEach(() => {
    secretValidation = new SecretValidation();
  });

  it('should throw an exception when api key does not a valid uuidv4', async () => {
    const apiKey = 'Abcdefgh1';

    const promise = secretValidation.validate(apiKey);

    await expect(promise).rejects.toThrowError(
      new DomainException(
        'Api Secret must be a valid UUID v4 (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)',
      ),
    );
  });

  it('should return true when password is valid', async () => {
    const apiKey = '71f97782-f5ea-42bf-8c04-50a69379ddd4';

    const result = await secretValidation.validate(apiKey);

    expect(result).toBe(true);
  });
});
