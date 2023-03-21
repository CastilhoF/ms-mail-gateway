import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import DomainException from '../../entities/shared/exceptions/domain.exception';

@Injectable()
export default class DeleteClientUseCase implements BaseUseCase<string, void> {
  private readonly logger: Logger = new Logger(DeleteClientUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(uid: string): Promise<void> {
    if (!uid) throw new DomainException('Client uid is required');

    const client: ClientEntity = await this.clientRepository.findByUid(uid);

    if (!client) throw new DomainException(`Client not found: ${uid}`);

    this.logger.log(`Deleting client: ${client.uid}`);

    await this.clientRepository.delete(client.uid);

    return;
  }
}
