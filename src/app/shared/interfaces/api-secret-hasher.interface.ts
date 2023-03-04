abstract class ApiSecretHasherInterface {
  abstract compare(
    apiSecret: string,
    hashedApiSecret: string,
  ): Promise<boolean>;

  abstract hash(apiSecret: string): Promise<string>;
}

export default ApiSecretHasherInterface;
