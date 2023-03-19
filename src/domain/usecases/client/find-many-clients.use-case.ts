import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';
import { FindManyInputDto } from './dtos/find-many-input.dto';

@Injectable()
export default class FindManyClientsUseCase
  implements BaseUseCase<FindManyInputDto, DefaultClientDto[]>
{
  private readonly logger: Logger = new Logger(FindManyClientsUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(input: FindManyInputDto): Promise<DefaultClientDto[]> {
    const { pagination, data } = input;

    this.logger.log(`Finding clients`);

    const foundClients: ClientEntity[] = await this.clientRepository.findMany(
      pagination,
      data,
    );

    const clients: DefaultClientDto[] = foundClients.map(
      DefaultClientMapper.toDto,
    );

    return clients;
  }
}
