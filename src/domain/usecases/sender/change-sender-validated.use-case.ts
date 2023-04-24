import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import DomainException from '../../entities/shared/exceptions/domain.exception';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';

@Injectable()
export default class ChangeSenderValidatedUseCase
  implements BaseUseCase<Partial<DefaultSenderDto>, DefaultSenderDto>
{
  private readonly logger: Logger = new Logger(
    ChangeSenderValidatedUseCase.name,
  );

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(input: Partial<DefaultSenderDto>): Promise<DefaultSenderDto> {
    if (!input.uid) {
      throw new DomainException('Sender uid is required');
    }

    const { uid, validated } = input;

    const sender: SenderEntity = await this.senderRepository.findByUid(uid);

    if (!sender) {
      throw new DomainException(`Sender not found: ${input.uid}`);
    }

    sender.validated = validated ? validated : false;

    const updatedAt = new Date();

    sender.updatedAt = updatedAt;

    this.logger.log(`Changing the sender validated: ${sender.uid}`);

    const updated: SenderEntity = Object.assign(sender, sender);

    const updatedSender: SenderEntity = await this.senderRepository.patch(
      sender.uid,
      updated,
    );

    this.logger.log(
      `Validated successfully changed for sender: ${updatedSender.uid}`,
    );

    return DefaultSenderMapper.toDto(updatedSender);
  }
}
