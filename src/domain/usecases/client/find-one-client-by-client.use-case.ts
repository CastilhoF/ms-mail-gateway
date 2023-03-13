import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';

@Injectable()
export default class FindOneClientByClientUseCase
  implements BaseUseCase<string, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(
    FindOneClientByClientUseCase.name,
  );

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(client: string): Promise<DefaultClientDto> {
    const clientEntity: ClientEntity = await this.clientRepository.findOne({
      client: client,
    });

    if (!clientEntity) {
      throw new Error(`Client not found: ${client}`);
    }

    this.logger.log(`Finding one client by client: ${clientEntity.client}`);

    return DefaultClientMapper.toDto(clientEntity);
  }
}
