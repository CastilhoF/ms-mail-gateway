import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';

@Injectable()
export default class FindAllClientsUseCase
  implements BaseUseCase<void, DefaultClientDto[]>
{
  private readonly logger: Logger = new Logger(FindAllClientsUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<DefaultClientDto[]> {
    const clients: ClientEntity[] = await this.clientRepository.findAll();

    this.logger.log(`Finding all clients: ${clients.length}`);

    return clients.map((client: ClientEntity) =>
      DefaultClientMapper.toDto(client),
    );
  }
}
