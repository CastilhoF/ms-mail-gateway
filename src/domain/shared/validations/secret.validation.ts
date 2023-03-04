import DomainException from '../../entities/shared/exceptions/domain.exception';

class SecretValidation {
  async validate(apiKey: string): Promise<boolean> {
    if (apiKey.length < 8) {
      throw new DomainException('Password must be at least 8 characters long');
    }

    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(apiKey)) {
      throw new DomainException(
        'Password must contain at least one lowercase letter',
      );
    }

    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(apiKey)) {
      throw new DomainException(
        'Password must contain at least one uppercase letter',
      );
    }

    const digitRegex = /\d/;
    if (!digitRegex.test(apiKey)) {
      throw new DomainException('Password must contain at least one digit');
    }

    const specialCharRegex = /[@$!%*?&]/;
    if (!specialCharRegex.test(apiKey)) {
      throw new DomainException(
        'Password must contain at least one special character (@$!%*?&)',
      );
    }

    return true;
  }
}

export default SecretValidation;
