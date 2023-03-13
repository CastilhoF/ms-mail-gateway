import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';

@Injectable()
export default class PatchClientUseCase
  implements BaseUseCase<Partial<DefaultClientDto>, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(PatchClientUseCase.name);
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(data: Partial<DefaultClientDto>): Promise<DefaultClientDto> {
    const client: ClientEntity = await this.clientRepository.findById(data.id);

    if (!client) {
      this.logger.error(`Client not found: ${data.id}`);
      throw new Error(`Client not found: ${data.id}`);
    }
    this.logger.log(`Patching client: ${client.id}`);
    const patchedClient: ClientEntity = await this.clientRepository.patch(
      client.id,
      data,
    );

    return DefaultClientMapper.toDto(patchedClient);
  }
}
