import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';
import DomainException from '../../entities/shared/exceptions/domain.exception';

@Injectable()
export default class PatchSenderUseCase
  implements BaseUseCase<Partial<DefaultSenderDto>, DefaultSenderDto>
{
  private readonly logger: Logger = new Logger(PatchSenderUseCase.name);
  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(data: Partial<DefaultSenderDto>): Promise<DefaultSenderDto> {
    if (!data.uid) throw new DomainException('Sender uid is required');

    const sender: SenderEntity = await this.senderRepository.findByUid(
      data.uid,
    );

    if (!sender) {
      this.logger.error(`Sender not found: ${data.uid}`);
      throw new DomainException(`Sender not found: ${data.uid}`);
    }

    const updatedAt = new Date();

    const updatedData: Partial<DefaultSenderDto> = {
      ...data,
      updatedAt,
    };

    const updatedSender: SenderEntity = Object.assign(sender, updatedData);

    this.logger.log(`Patching sender: ${sender.uid}`);
    const patchedSender: SenderEntity = await this.senderRepository.patch(
      data.uid,
      updatedSender,
    );

    return DefaultSenderMapper.toDto(patchedSender);
  }
}
