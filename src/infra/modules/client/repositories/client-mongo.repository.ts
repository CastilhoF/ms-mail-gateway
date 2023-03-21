import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import ClientEntity from '../../../../domain/entities/client/client.entity';
import ClientModel from '../../database/models/client-model';
import { ClientDocument } from '../../../../infra/configuration/ioc/database/schemas/client.schema';
import ClientModelMapper from '../../database/mappers/client-model.mapper';
import DatabaseConflictException from '../../database/exceptions/database-conflict.exception';
import DatabaseNotFoundException from '../../database/exceptions/database-not-found.exception';
import { PaginationDto } from '../../../../domain/usecases/client/dtos/pagination.dto';

@Injectable()
class ClientMongoRepository implements ClientRepository {
  private readonly logger: Logger = new Logger(ClientMongoRepository.name);

  constructor(
    @InjectModel(ClientModel.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    const clients: ClientDocument[] = await this.clientModel.find().exec();

    if (clients.length === 0)
      throw new DatabaseNotFoundException('No clients found');

    return clients.map((client) => ClientModelMapper.toEntity(client));
  }

  async findMany(
    pagination: PaginationDto,
    filter: Partial<ClientEntity>,
  ): Promise<{ entities: ClientEntity[]; total: number }> {
    const partialClientModel: Partial<ClientModel> =
      ClientModelMapper.partialEntityToPartialModel(filter);

    const skip = (pagination.page - 1) * pagination.limit;

    const [clients, total] = await Promise.all([
      this.clientModel
        .find(partialClientModel)
        .skip(skip)
        .limit(pagination.limit)
        .catch((error) => {
          this.logger.error(error);
          throw error;
        }),
      this.clientModel.countDocuments(partialClientModel),
    ]);

    if (clients.length === 0)
      throw new DatabaseNotFoundException('No clients found');

    return {
      entities: clients.map((client) => ClientModelMapper.toEntity(client)),
      total,
    };
  }

  async findById(id: string): Promise<ClientEntity> {
    const client: ClientDocument = await this.clientModel
      .findById(id)
      .exec()
      .catch((error) => {
        this.logger.error(error);
        throw new DatabaseNotFoundException(error);
      });

    if (!client) throw new DatabaseNotFoundException('Client not found');

    return ClientModelMapper.toEntity(client);
  }

  async findOne(filter: Partial<ClientEntity>): Promise<ClientEntity> {
    const partialClientModel: Partial<ClientModel> =
      ClientModelMapper.partialEntityToPartialModel(filter);

    const client: ClientDocument = await this.clientModel
      .findOne(partialClientModel)
      .exec()
      .catch((error) => {
        this.logger.error(error);
        throw new DatabaseNotFoundException(error);
      });

    if (!client) throw new DatabaseNotFoundException('Client not found');

    return ClientModelMapper.toEntity(client);
  }

  async save(entity: ClientEntity): Promise<ClientEntity> {
    const clientModel: ClientModel = ClientModelMapper.toModel(entity);

    const client: ClientDocument = await this.clientModel
      .create(clientModel)
      .catch((error) => {
        this.logger.error(error);
        if (error.code === 11_000) {
          throw new DatabaseConflictException(error);
        }
        throw error;
      });

    return ClientModelMapper.toEntity(client);
  }

  async update(id: string, entity: ClientEntity): Promise<ClientEntity> {
    const clientModel: ClientModel = ClientModelMapper.toModel(entity);

    const { _id, ...clientModelWithoutId } = clientModel;

    await this.clientModel
      .updateOne({ _id }, clientModelWithoutId)
      .catch((error) => {
        this.logger.error(error);
        throw error;
      });

    return this.findById(id);
  }

  async patch(
    id: string,
    partialEntity: Partial<ClientEntity>,
  ): Promise<ClientEntity> {
    const partialClientModel: Partial<ClientModel> =
      ClientModelMapper.partialEntityToPartialModel(partialEntity);

    await this.clientModel
      .updateOne({ _id: id }, partialClientModel)
      .catch((error) => {
        this.logger.error(error);
        throw error;
      });

    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.clientModel.deleteOne({ _id: id }).catch((error) => {
      this.logger.error(error);
      throw error;
    });
  }
}

export default ClientMongoRepository;
