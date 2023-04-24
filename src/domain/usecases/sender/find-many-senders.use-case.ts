import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import SenderRepository from '../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../entities/sender/sender.entity';
import { DefaultSenderDto } from './dtos/default-sender.dto';
import DefaultSenderMapper from './mappers/default-sender.mapper';
import { FindManyInputDto } from './dtos/find-many-input.dto';
import { FindManyOutputDto } from './dtos/find-many-output.dto';

@Injectable()
export default class FindManySendersUseCase
  implements
    BaseUseCase<
      FindManyInputDto,
      { entities: DefaultSenderDto[]; total: number }
    >
{
  private readonly logger: Logger = new Logger(FindManySendersUseCase.name);

  constructor(private readonly senderRepository: SenderRepository) {}

  async execute(input: FindManyInputDto): Promise<FindManyOutputDto> {
    const { pagination, data } = input;

    this.logger.log(`Finding senders`);

    const foundSenders: { entities: SenderEntity[]; total: number } =
      await this.senderRepository.findMany(pagination, data);

    const entities: DefaultSenderDto[] = foundSenders?.entities.map(
      DefaultSenderMapper.toDto,
    );

    return { entities, total: foundSenders.total };
  }
}
