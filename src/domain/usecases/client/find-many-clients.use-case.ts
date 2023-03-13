import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';

@Injectable()
export default class FindManyClientsUseCase
  implements BaseUseCase<Partial<DefaultClientDto>, DefaultClientDto[]>
{
  private readonly logger: Logger = new Logger(FindManyClientsUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(data: Partial<DefaultClientDto>): Promise<DefaultClientDto[]> {
    this.logger.log(`Finding clients`);
    const foundClients: ClientEntity[] = await this.clientRepository.findMany(
      data,
    );

    if (foundClients.length === 0) {
      this.logger.error(`No clients found`);
      throw new Error(`No clients found`);
    }

    const clients: DefaultClientDto[] = foundClients.map(
      DefaultClientMapper.toDto,
    );

    return clients;
  }
}
