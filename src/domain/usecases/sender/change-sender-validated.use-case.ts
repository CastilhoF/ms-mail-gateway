import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import DomainException from '../../entities/shared/exceptions/domain.exception';
import { DefaultSenderDto } from './dtos/default-sender.dto';

@Injectable()
export default class ChangeSenderValidatedUseCase
  implements BaseUseCase<Partial<DefaultSenderDto>, string>
{
  private readonly logger: Logger = new Logger(
    ChangeSenderValidatedUseCase.name,
  );

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(input: Partial<DefaultSenderDto>): Promise<string> {
    const { uid, validated } = input;
    const sender: SenderEntity = await this.senderRepository.findByUid(uid);

    if (!sender) {
      throw new DomainException(`Sender not found: ${input.uid}`);
    }

    sender.validated = validated;

    this.logger.log(`Changing the sender validated: ${sender.uid}`);

    const updatedSender: SenderEntity = await this.senderRepository.update(
      sender.uid,
      sender,
    );

    this.logger.log(
      `Validated successfully changed for sender: ${updatedSender.uid}`,
    );

    return `Validated successfully changed for sender: ${updatedSender.uid}`;
  }
}
