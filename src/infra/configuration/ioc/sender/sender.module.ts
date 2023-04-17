import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SenderRepositoryProvider } from './providers/sender-repository.provider';
import CreateSenderUseCase from '../../../../domain/usecases/sender/create-sender.use-case';
import DeleteSenderUseCase from '../../../../domain/usecases/sender/delete-sender.use-case';
import FindAllSendersUseCase from '../../../../domain/usecases/sender/find-all-senders.use-case';
import FindManySendersUseCase from '../../../../domain/usecases/sender/find-many-senders.use-case';
import FindSenderByClientUidUseCase from '../../../../domain/usecases/sender/find-sender-by-client-uid.use-case';
import PatchSenderUseCase from '../../../../domain/usecases/sender/patch-sender.use-case';
import { senderSchemaOptions } from '../database/schemas/sender.schema';

@Module({
  imports: [MongooseModule.forFeature([senderSchemaOptions])],
  providers: [
    SenderRepositoryProvider,
    CreateSenderUseCase,
    DeleteSenderUseCase,
    FindAllSendersUseCase,
    FindManySendersUseCase,
    FindSenderByClientUidUseCase,
    PatchSenderUseCase,
  ],
  exports: [
    CreateSenderUseCase,
    DeleteSenderUseCase,
    FindAllSendersUseCase,
    FindManySendersUseCase,
    FindSenderByClientUidUseCase,
    PatchSenderUseCase,
  ],
})
class SenderModule {}

export default SenderModule;
