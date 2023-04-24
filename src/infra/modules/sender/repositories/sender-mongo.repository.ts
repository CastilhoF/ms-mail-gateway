import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';
import SenderModel from '../../database/models/sender-model';
import { SenderDocument } from '../../../../infra/configuration/ioc/database/schemas/sender.schema';
import SenderModelMapper from '../../database/mappers/sender-model.mapper';
import DatabaseConflictException from '../../database/exceptions/database-conflict.exception';
import DatabaseNotFoundException from '../../database/exceptions/database-not-found.exception';
import { PaginationDto } from '../../../../domain/usecases/sender/dtos/pagination.dto';

@Injectable()
class SenderMongoRepository implements SenderRepository {
  private readonly logger: Logger = new Logger(SenderMongoRepository.name);

  constructor(
    @InjectModel(SenderModel.name)
    private readonly senderModel: Model<SenderDocument>,
  ) {}

  async findAll(): Promise<SenderEntity[]> {
    const senders: SenderDocument[] = await this.senderModel.find().exec();

    if (senders.length === 0)
      throw new DatabaseNotFoundException('No senders found');

    return senders.map((sender) => SenderModelMapper.toEntity(sender));
  }

  async findMany(
    pagination: PaginationDto,
    filter: Partial<SenderEntity>,
  ): Promise<{ entities: SenderEntity[]; total: number }> {
    const partialSenderModel: Partial<SenderModel> =
      SenderModelMapper.partialEntityToPartialModel(filter);

    const skip = (pagination.page - 1) * pagination.limit;

    const [senders, total] = await Promise.all([
      this.senderModel
        .find(partialSenderModel)
        .skip(pagination.page > 1 ? skip : undefined)
        .limit(pagination.limit)
        .catch((error) => {
          this.logger.error(error);
          throw error;
        }),
      this.senderModel.countDocuments(partialSenderModel).catch((error) => {
        this.logger.error(error);
        throw error;
      }),
    ]);

    if (senders.length === 0)
      throw new DatabaseNotFoundException('No senders found');

    return {
      entities: senders.map((sender) => SenderModelMapper.toEntity(sender)),
      total,
    };
  }

  async findByUid(uid: string): Promise<SenderEntity> {
    const sender: SenderDocument = await this.senderModel
      .findOne({ uid: uid })
      .exec()
      .catch((error) => {
        this.logger.error(error);
        throw new Error(error);
      });

    if (!sender) throw new DatabaseNotFoundException('Sender not found');

    return SenderModelMapper.toEntity(sender);
  }

  async findOne(filter: Partial<SenderEntity>): Promise<SenderEntity> {
    const partialSenderModel: Partial<SenderModel> =
      SenderModelMapper.partialEntityToPartialModel(filter);

    const sender: SenderDocument = await this.senderModel
      .findOne(partialSenderModel)
      .exec()
      .catch((error) => {
        this.logger.error(error);
        throw new Error(error);
      });

    if (!sender) throw new DatabaseNotFoundException('Sender not found');

    return SenderModelMapper.toEntity(sender);
  }

  async findOneByEmail(email: string): Promise<SenderEntity> {
    const sender = await this.findOne({ email: email });

    return sender;
  }

  async findOneByName(name: string): Promise<SenderEntity> {
    const sender = await this.findOne({ name: name });

    return sender;
  }

  async findOneByClientUid(clientUid: string): Promise<SenderEntity> {
    const sender = await this.findOne({ clientUid: clientUid });

    return sender;
  }

  async save(entity: SenderEntity): Promise<SenderEntity> {
    const senderModel: SenderModel = SenderModelMapper.toModel(entity);

    const sender: SenderDocument = await this.senderModel
      .create(senderModel)
      .catch((error) => {
        this.logger.error(error);
        throw new DatabaseConflictException(error);
      });

    return SenderModelMapper.toEntity(sender);
  }

  async update(uid: string, entity: SenderEntity): Promise<SenderEntity> {
    const senderModel: SenderModel = SenderModelMapper.toModel(entity);

    const { ...senderModelWithoutUid } = senderModel;

    await this.senderModel
      .updateOne({ uid: uid }, senderModelWithoutUid)
      .catch((error) => {
        this.logger.error(error);
        throw new DatabaseConflictException(error);
      });

    return await this.findByUid(uid);
  }

  async patch(
    uid: string,
    partialEntity: Partial<SenderEntity>,
  ): Promise<SenderEntity> {
    const partialSenderModel: Partial<SenderModel> =
      SenderModelMapper.partialEntityToPartialModel(partialEntity);

    await this.senderModel
      .updateOne({ uid: uid }, partialSenderModel)
      .catch((error) => {
        this.logger.error(error);
        throw new Error(error);
      });

    return await this.findByUid(uid);
  }

  async delete(uid: string): Promise<void> {
    const sender: SenderDocument = await this.senderModel
      .findOne({ uid: uid })
      .exec()
      .catch((error) => {
        this.logger.error(error);
        throw new Error(error);
      });

    if (!sender) throw new DatabaseNotFoundException('Sender not found');

    await this.senderModel.deleteOne(sender).catch((error) => {
      this.logger.error(error);
      throw error;
    });
  }
}

export default SenderMongoRepository;
