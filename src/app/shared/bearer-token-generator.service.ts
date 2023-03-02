abstract class BearerTokenGeneratorService {
  abstract generate(
    payload: Record<string, unknown>,
  ): Promise<string>;
}

export default BearerTokenGeneratorService;