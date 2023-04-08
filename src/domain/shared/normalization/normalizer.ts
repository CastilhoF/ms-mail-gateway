import DomainException from '../../entities/shared/exceptions/domain.exception';

class Normalizer {
  public static normalizeClient(client: string): string {
    if (!client) {
      throw new DomainException('client is required');
    }

    const clientNormalized = client.trim().replace(/ /g, '-').toLowerCase();

    return clientNormalized;
  }

  public static normalizeSender(sender: string): string {
    if (!sender) {
      throw new DomainException('sender is required');
    }

    const senderNormalized = sender.trim().replace(/ /g, '-').toLowerCase();

    return senderNormalized;
  }
}

export default Normalizer;
