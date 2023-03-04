abstract class BearerTokenGeneratorInterface {
  abstract generate(payload: Record<string, unknown>): Promise<string>;
}

export default BearerTokenGeneratorInterface;
