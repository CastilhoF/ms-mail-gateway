import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';

@Injectable()
export default class DeleteClientUseCase implements BaseUseCase<string, void> {
  private readonly logger: Logger = new Logger(DeleteClientUseCase.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    const client: ClientEntity = await this.clientRepository.findById(id);

    if (!client) {
      throw new Error(`Client not found: ${id}`);
    }

    this.logger.log(`Deleting client: ${client.id}`);

    await this.clientRepository.delete(client.id);

    return;
  }
}
