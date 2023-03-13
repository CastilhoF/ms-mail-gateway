import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import ApiSecretHasherInterface from '../../../app/shared/interfaces/api-secret-hasher.interface';
import SecretValidation from '../../shared/validations/secret.validation';
import { ChangeClientApiSecretInputDto } from './dtos/change-client-api-secret-input.dto';
import DomainException from '../../../domain/entities/shared/exceptions/domain.exception';

@Injectable()
export default class ChangeTheClientApiSecretUseCase
  implements BaseUseCase<ChangeClientApiSecretInputDto, string>
{
  private readonly logger: Logger = new Logger(
    ChangeTheClientApiSecretUseCase.name,
  );
  private readonly secretValidation: SecretValidation = new SecretValidation();

  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly apiSecretHasher: ApiSecretHasherInterface,
  ) {}

  async execute(input: ChangeClientApiSecretInputDto): Promise<string> {
    const { id, apiSecret } = input;

    if (!id || !apiSecret) {
      throw new DomainException(
        'Invalid input: id and apiSecret are required.',
      );
    }

    const client: ClientEntity = await this.clientRepository.findById(id);

    if (!client) {
      throw new DomainException(`Client not found: ${id}`);
    }

    await this.secretValidation.validate(apiSecret);

    let hashedApiSecret: string;

    if (apiSecret) {
      hashedApiSecret = await this.apiSecretHasher.hash(apiSecret);
    }

    client.apiSecret = hashedApiSecret;

    this.logger.log(`Changing the client API secret: ${client.id}`);

    const updatedClient: ClientEntity = await this.clientRepository.save(
      client,
    );

    this.logger.log(
      `API Secret successfully changed for client: ${updatedClient.id}`,
    );

    return `API Secret successfully changed for client: ${updatedClient.id}`;
  }
}
