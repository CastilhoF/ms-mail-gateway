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

  public static normalizeService(service: string): string {
    if (!service) {
      throw new DomainException('service is required');
    }

    const serviceNormalized = service.trim().replace(/ /g, '-').toLowerCase();

    return serviceNormalized;
  }
}

export default Normalizer;
