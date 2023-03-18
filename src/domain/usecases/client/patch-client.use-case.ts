import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';
import ApiKeyGeneratorInterface from '../../../app/shared/interfaces/api-key-generator.interface';
import DomainException from '../../entities/shared/exceptions/domain.exception';

@Injectable()
export default class PatchClientUseCase
  implements BaseUseCase<Partial<DefaultClientDto>, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(PatchClientUseCase.name);
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly apiKeyGenerator: ApiKeyGeneratorInterface,
  ) {}

  async execute(data: Partial<DefaultClientDto>): Promise<DefaultClientDto> {
    if (!data.id) throw new DomainException('Client id is required');

    const client: ClientEntity = await this.clientRepository.findById(data.id);

    if (!client) {
      this.logger.error(`Client not found: ${data.id}`);
      throw new DomainException(`Client not found: ${data.id}`);
    }
    const updatedAt = new Date();

    let updatedData: Partial<DefaultClientDto>;

    if (data.client) {
      const apiKey = await this.apiKeyGenerator.hash(data.client);
      updatedData = {
        ...data,
        apiKey,
        updatedAt,
      };
    } else {
      updatedData = {
        ...data,
        updatedAt,
      };
    }

    const updatedClient: ClientEntity = Object.assign(client, updatedData);

    this.logger.log(`Patching client: ${client.id}`);
    const patchedClient: ClientEntity = await this.clientRepository.patch(
      client.id,
      updatedClient,
    );

    return DefaultClientMapper.toDto(patchedClient);
  }
}
