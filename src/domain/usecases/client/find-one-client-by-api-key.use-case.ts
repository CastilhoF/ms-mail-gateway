import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';
import DomainException from '../../../domain/entities/shared/exceptions/domain.exception';

@Injectable()
export default class FindOneClientByApiKeyUseCase
  implements BaseUseCase<string, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(
    FindOneClientByApiKeyUseCase.name,
  );

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(apiKey: string): Promise<DefaultClientDto> {
    const client: ClientEntity = await this.clientRepository.findOne({
      apiKey: apiKey,
    });

    if (!client) {
      throw new DomainException(`Client not found: ${apiKey}`);
    }

    this.logger.log(`Finding one client by ID: ${client.uid}`);

    return DefaultClientMapper.toDto(client);
  }
}
