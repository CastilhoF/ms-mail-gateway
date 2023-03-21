import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { DefaultClientDto } from './dtos/default-client.dto';
import DefaultClientMapper from './mappers/default-client.mapper';
import DomainException from '../../../domain/entities/shared/exceptions/domain.exception';

@Injectable()
export default class FindOneClientByUidUseCase
  implements BaseUseCase<string, DefaultClientDto>
{
  private readonly logger: Logger = new Logger(FindOneClientByUidUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(uid: string): Promise<DefaultClientDto> {
    const client: ClientEntity = await this.clientRepository.findByUid(uid);

    if (!client) {
      throw new DomainException(`Client not found: ${uid}`);
    }

    this.logger.log(`Finding one client by ID: ${client.uid}`);

    return DefaultClientMapper.toDto(client);
  }
}
