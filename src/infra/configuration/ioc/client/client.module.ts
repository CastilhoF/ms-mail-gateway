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
import FindOneClientByUidUseCase from '../../../../domain/usecases/client/find-one-client-by-uid.use-case';
import FindOneClientByApiKeyUseCase from '../../../../domain/usecases/client/find-one-client-by-api-key.use-case';
import FindOneClientByHostUseCase from '../../../../domain/usecases/client/find-one-client-by-host.use-case';
import PatchClientUseCase from '../../../../domain/usecases/client/patch-client.use-case';
import { clientSchemaOptions } from '../database/schemas/client.schema';
//import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([clientSchemaOptions]),
    //PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ClientController],
  providers: [
    ClientRepositoryProvider,
    CreateClientUseCase,
    DeleteClientUseCase,
    FindAllClientsUseCase,
    FindManyClientsUseCase,
    FindOneClientByClientUseCase,
    FindOneClientByUidUseCase,
    FindOneClientByHostUseCase,
    FindOneClientByApiKeyUseCase,
    PatchClientUseCase,
    ClientService,
  ],
  exports: [ClientService],
})
class ClientModule {}

export default ClientModule;
