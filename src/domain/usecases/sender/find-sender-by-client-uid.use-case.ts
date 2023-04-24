import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';
import DomainException from '../../../domain/entities/shared/exceptions/domain.exception';

@Injectable()
export default class FindSenderByClientUidUseCase
  implements BaseUseCase<string, DefaultSenderDto>
{
  private readonly logger: Logger = new Logger(
    FindSenderByClientUidUseCase.name,
  );

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(clientUid: string): Promise<DefaultSenderDto> {
    const sender: SenderEntity = await this.senderRepository.findOne({
      clientUid: clientUid,
    });

    if (!sender) {
      throw new DomainException(`Sender not found: ${clientUid}`);
    }

    this.logger.log(`Finding one sender by ID: ${sender.uid}`);

    return DefaultSenderMapper.toDto(sender);
  }
}
