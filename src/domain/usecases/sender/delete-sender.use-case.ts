import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import DomainException from '../../entities/shared/exceptions/domain.exception';

@Injectable()
export default class DeleteSenderUseCase implements BaseUseCase<string, void> {
  private readonly logger: Logger = new Logger(DeleteSenderUseCase.name);

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(uid: string): Promise<void> {
    if (!uid) throw new DomainException('Sender uid is required');

    const sender: SenderEntity = await this.senderRepository.findByUid(uid);

    if (!sender) throw new DomainException(`Sender not found: ${uid}`);

    this.logger.log(`Deleting sender: ${sender.uid}`);

    await this.senderRepository.delete(sender.uid);

    return;
  }
}
