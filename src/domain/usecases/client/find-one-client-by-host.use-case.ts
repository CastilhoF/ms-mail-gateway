import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';

@Injectable()
export default class FindOneClientByHostUseCase
  implements BaseUseCase<string, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(FindOneClientByHostUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(host: string): Promise<DefaultClientDto> {
    const client: ClientEntity = await this.clientRepository.findOne({
      host: host,
    });

    if (!client) {
      throw new Error(`Client not found: ${host}`);
    }

    this.logger.log(`Finding one client by host: ${client.host}`);

    return DefaultClientMapper.toDto(client);
  }
}
