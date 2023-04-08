import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';

@Injectable()
export default class CreateSenderUseCase
  implements BaseUseCase<DefaultSenderDto, DefaultSenderDto>
{
  private readonly logger: Logger = new Logger(CreateSenderUseCase.name);

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(input: DefaultSenderDto): Promise<DefaultSenderDto> {
    const {
      uid,
      name,
      email,
      service,
      senderApiKey,
      validated,
      clientUid,
      createdAt,
      updatedAt,
    } = input;

    const senderEntity: SenderEntity = new SenderEntity(
      uid,
      name,
      email,
      service,
      senderApiKey,
      validated,
      clientUid,
      createdAt,
      updatedAt,
    );

    this.logger.log(`Creating sender: ${senderEntity.uid}`);

    const createdSender: SenderEntity = await this.senderRepository.save(
      senderEntity,
    );

    return DefaultSenderMapper.toDto(createdSender);
  }
}
