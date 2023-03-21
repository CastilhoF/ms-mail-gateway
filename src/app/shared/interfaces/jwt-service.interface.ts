abstract class JwtServiceInterface {
  abstract sign(payload: any): Promise<string>;
}

export default JwtServiceInterface;
