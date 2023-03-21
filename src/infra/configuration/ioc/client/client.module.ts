import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientRepositoryProvider } from './providers/client-repository.provider';
import ClientService from '../../../modules/client/services/client.service';
import ClientController from '../../../modules/client/controllers/client.controller';
import CreateClientUseCase from '../../../../domain/usecases/client/create-client.use-case';
import DeleteClientUseCase from '../../../../domain/usecases/client/delete-client.use-case';
import FindAllClientsUseCase from '../../../../domain/usecases/client/find-all-clients.use-case';
import FindManyClientsUseCase from '../../../../domain/usecases/client/find-many-clients.use-case';
import FindOneClientByClientUseCase from '../../../../domain/usecases/client/find-one-client-by-client.use-case';
import FindOneClientByIdUseCase from '../../../../domain/usecases/client/find-one-client-by-id.use-case';
import FindOneClientByHostUseCase from '../../../../domain/usecases/client/find-one-client-by-host.use-case';
import PatchClientUseCase from '../../../../domain/usecases/client/patch-client.use-case';
import { clientSchemaOptions } from '../database/schemas/client.schema';

@Module({
  imports: [MongooseModule.forFeature([clientSchemaOptions])],
  controllers: [ClientController],
  providers: [
    ClientRepositoryProvider,
    CreateClientUseCase,
    DeleteClientUseCase,
    FindAllClientsUseCase,
    FindManyClientsUseCase,
    FindOneClientByClientUseCase,
    FindOneClientByIdUseCase,
    FindOneClientByHostUseCase,
    PatchClientUseCase,
    ClientService,
  ],
})
class ClientModule {}

export default ClientModule;
