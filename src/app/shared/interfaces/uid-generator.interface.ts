abstract class UidGeneratorInterface {
  abstract generate(): Promise<string>;
}

export default UidGeneratorInterface;
