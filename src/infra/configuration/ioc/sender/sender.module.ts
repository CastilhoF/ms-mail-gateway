import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SenderRepositoryProvider } from './providers/sender-repository.provider';
import CreateSenderUseCase from '../../../../domain/usecases/sender/create-sender.use-case';
import ChangeSenderValidatedUseCase from '../../../../domain/usecases/sender/change-sender-validated.use-case';
import DeleteSenderUseCase from '../../../../domain/usecases/sender/delete-sender.use-case';
import FindAllSendersUseCase from '../../../../domain/usecases/sender/find-all-senders.use-case';
import FindManySendersUseCase from '../../../../domain/usecases/sender/find-many-senders.use-case';
import FindSenderByClientUidUseCase from '../../../../domain/usecases/sender/find-sender-by-client-uid.use-case';
import PatchSenderUseCase from '../../../../domain/usecases/sender/patch-sender.use-case';
import { senderSchemaOptions } from '../database/schemas/sender.schema';
import SenderService from '../../../../infra/modules/sender/services/sender.service';
import SenderController from '../../../../infra/modules/sender/controllers/sender.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([senderSchemaOptions]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SenderController],
  providers: [
    SenderRepositoryProvider,
    CreateSenderUseCase,
    ChangeSenderValidatedUseCase,
    DeleteSenderUseCase,
    FindAllSendersUseCase,
    FindManySendersUseCase,
    FindSenderByClientUidUseCase,
    PatchSenderUseCase,
    SenderService,
  ],
  exports: [SenderService],
})
class SenderModule {}

export default SenderModule;
