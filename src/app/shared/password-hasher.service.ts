abstract class PasswordHasherService {
  abstract compare(password: string, hashedPassword: string): Promise<boolean>;
  abstract hash(password: string): string;
}

export default PasswordHasherService;