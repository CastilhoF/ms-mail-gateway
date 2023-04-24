import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';
import UidGeneratorInterface from '../../../app/shared/interfaces/uid-generator.interface';
import { CreateSenderInputDto } from './dtos/create-sender-input.dto.ts';

@Injectable()
export default class CreateSenderUseCase
  implements BaseUseCase<CreateSenderInputDto, DefaultSenderDto>
{
  private readonly logger: Logger = new Logger(CreateSenderUseCase.name);

  constructor(
    private readonly senderRepository: SenderRepository,
    private readonly uidGenerator: UidGeneratorInterface,
  ) {}

  async execute(input: CreateSenderInputDto): Promise<DefaultSenderDto> {
    const { name, email, service, senderApiKey, clientUid } = input;

    const senderUid = await this.uidGenerator.generate();

    const senderEntity: SenderEntity = new SenderEntity(
      senderUid,
      name,
      email,
      service,
      senderApiKey,
      false,
      clientUid,
      new Date(),
      new Date(),
    );

    this.logger.log(`Creating sender: ${senderEntity.uid}`);

    const createdSender: SenderEntity = await this.senderRepository.save(
      senderEntity,
    );

    return DefaultSenderMapper.toDto(createdSender);
  }
}
