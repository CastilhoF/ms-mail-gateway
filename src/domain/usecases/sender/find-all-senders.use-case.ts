import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';

@Injectable()
export default class FindAllSendersUseCase
  implements BaseUseCase<void, DefaultSenderDto[]>
{
  private readonly logger: Logger = new Logger(FindAllSendersUseCase.name);

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(): Promise<DefaultSenderDto[]> {
    const senders: SenderEntity[] = await this.senderRepository.findAll();

    this.logger.log(`Finding all senders: ${senders.length}`);

    return senders.map((sender: SenderEntity) =>
      DefaultSenderMapper.toDto(sender),
    );
  }
}
