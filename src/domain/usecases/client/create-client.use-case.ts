import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { CreateClientInputDto } from './dtos/create-client-input.dto';
import { CreateClientOutputDto } from './dtos/create-client-output.dto';
import CreateClientMapper from './mappers/create-client.mapper';
import ApiKeyGeneratorInterface from '../../../app/shared/interfaces/api-key-generator.interface';
import UidGeneratorInterface from '../../../app/shared/interfaces/uid-generator.interface';
import ApiSecretHasherInterface from '../../../app/shared/interfaces/api-secret-hasher.interface';
import SecretValidation from '../../shared/validations/secret.validation';

@Injectable()
export default class CreateClientUseCase
  implements BaseUseCase<CreateClientInputDto, CreateClientOutputDto>
{
  private readonly logger: Logger = new Logger(CreateClientUseCase.name);
  private readonly secretValidation: SecretValidation = new SecretValidation();

  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly apiKeyGenerator: ApiKeyGeneratorInterface,
    private readonly apiSecretHasher: ApiSecretHasherInterface,
    private readonly uidGenerator: UidGeneratorInterface,
  ) {}

  async execute(input: any): Promise<CreateClientOutputDto> {
    const { host, client, apiSecret } = input;

    await this.secretValidation.validate(apiSecret);

    let hashedApiKey: string;
    let hashedApiSecret: string;

    if (client) {
      hashedApiKey = await this.apiKeyGenerator.hash(client);
    }

    if (apiSecret) {
      hashedApiSecret = await this.apiSecretHasher.hash(apiSecret);
    }

    const clientEntity: ClientEntity = CreateClientMapper.toEntity({
      host,
      client,
      apiKey: hashedApiKey,
      apiSecret: hashedApiSecret,
    });

    clientEntity.uid = await this.uidGenerator.generate();

    this.logger.log(`Creating client: ${clientEntity.uid}`);

    const createdClient: ClientEntity = await this.clientRepository.save(
      clientEntity,
    );

    return CreateClientMapper.toOutputDto(createdClient);
  }
}
