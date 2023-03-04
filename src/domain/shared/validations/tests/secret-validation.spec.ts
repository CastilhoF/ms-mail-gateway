import SecretValidation from '../secret.validation';
import DomainException from '../../../entities/shared/exceptions/domain.exception';

describe('SecretValidation', () => {
  let secretValidation: SecretValidation;

  beforeEach(() => {
    secretValidation = new SecretValidation();
  });

  it('should throw an exception when password is less than 8 characters long', async () => {
    const apiKey = '1234567';

    const promise = secretValidation.validate(apiKey);

    await expect(promise).rejects.toThrowError(
      new DomainException('Password must be at least 8 characters long'),
    );
  });

  it('should throw an exception when password does not contain lowercase letters', async () => {
    const apiKey = 'ABCDEFGH1$';

    const promise = secretValidation.validate(apiKey);

    await expect(promise).rejects.toThrowError(
      new DomainException(
        'Password must contain at least one lowercase letter',
      ),
    );
  });

  it('should throw an exception when password does not contain uppercase letters', async () => {
    const apiKey = 'abcdefgh1$';

    const promise = secretValidation.validate(apiKey);

    await expect(promise).rejects.toThrowError(
      new DomainException(
        'Password must contain at least one uppercase letter',
      ),
    );
  });

  it('should throw an exception when password does not contain digits', async () => {
    const apiKey = 'Abcdefgh$';

    const promise = secretValidation.validate(apiKey);

    await expect(promise).rejects.toThrowError(
      new DomainException('Password must contain at least one digit'),
    );
  });

  it('should throw an exception when password does not contain special characters', async () => {
    const apiKey = 'Abcdefgh1';

    const promise = secretValidation.validate(apiKey);

    await expect(promise).rejects.toThrowError(
      new DomainException(
        'Password must contain at least one special character (@$!%*?&)',
      ),
    );
  });

  it('should return true when password is valid', async () => {
    const apiKey = 'Abcdefgh1$';

    const result = await secretValidation.validate(apiKey);

    expect(result).toBe(true);
  });
});
