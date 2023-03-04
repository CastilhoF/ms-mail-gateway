abstract class ApiKeyGeneratorInterface {
  abstract hash(client: string): Promise<string>;
}

export default ApiKeyGeneratorInterface;
