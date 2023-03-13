import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';

@Injectable()
export default class FindOneClientByIdUseCase
  implements BaseUseCase<string, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(FindOneClientByIdUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<DefaultClientDto> {
    const client: ClientEntity = await this.clientRepository.findById(id);

    if (!client) {
      throw new Error(`Client not found: ${id}`);
    }

    this.logger.log(`Finding one client by ID: ${client.id}`);

    return DefaultClientMapper.toDto(client);
  }
}
