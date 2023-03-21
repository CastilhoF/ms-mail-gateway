import DomainException from '../../entities/shared/exceptions/domain.exception';

class SecretValidation {
  async validate(apiSecret: string): Promise<boolean> {
    const isUUidV4 =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[8|9aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!isUUidV4.test(apiSecret)) {
      throw new DomainException(
        'Api Secret must be a valid UUID v4 (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)',
      );
    }

    return true;
  }
}

export default SecretValidation;
