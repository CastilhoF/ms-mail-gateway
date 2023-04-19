import { Injectable } from '@nestjs/common';
import { errorCallback } from '../../helpers/exceptions/exception.callback';
import { DefaultSenderDto } from '../../../../domain/usecases/sender/dtos/default-sender.dto';
import { FindManyInputDto } from '../../../../domain/usecases/sender/dtos/find-many-input.dto';
import { FindManyOutputDto } from '../../../../domain/usecases/sender/dtos/find-many-output.dto';
import CreateSenderUseCase from '../../../../domain/usecases/sender/create-sender.use-case';
import DeleteSenderUseCase from '../../../../domain/usecases/sender/delete-sender.use-case';
import FindAllSendersUseCase from '../../../../domain/usecases/sender/find-all-senders.use-case';
import FindManySendersUseCase from '../../../../domain/usecases/sender/find-many-senders.use-case';
import ChangeSenderValidatedUseCase from '../../../../domain/usecases/sender/change-sender-validated.use-case';
import FindSenderByClientUidUseCase from '../../../../domain/usecases/sender/find-sender-by-client-uid.use-case';
import PatchSenderUseCase from '../../../../domain/usecases/sender/patch-sender.use-case';

@Injectable()
class SenderService {
  constructor(
    private readonly createSenderUseCase: CreateSenderUseCase,
    private readonly deleteSenderUseCase: DeleteSenderUseCase,
    private readonly findAllSendersUseCase: FindAllSendersUseCase,
    private readonly findManySendersUseCase: FindManySendersUseCase,
    private readonly changeSenderValidatedUseCase: ChangeSenderValidatedUseCase,
    private readonly findSenderByClientUidUseCase: FindSenderByClientUidUseCase,
    private readonly patchSenderUseCase: PatchSenderUseCase,
  ) {}

  public async createSender(
    input: DefaultSenderDto,
  ): Promise<DefaultSenderDto> {
    const result = await this.createSenderUseCase
      .execute(input)
      .catch(errorCallback);

    return result;
  }

  public async deleteSender(uid: string): Promise<void> {
    await this.deleteSenderUseCase.execute(uid).catch(errorCallback);
  }

  public async findAllSenders(): Promise<DefaultSenderDto[]> {
    const result = await this.findAllSendersUseCase
      .execute()
      .catch(errorCallback);

    return result;
  }

  public async findManySenders(
    input: FindManyInputDto,
  ): Promise<FindManyOutputDto> {
    const result = await this.findManySendersUseCase
      .execute(input)
      .catch(errorCallback);

    return result;
  }

  public async changeSenderValidated(
    input: Partial<DefaultSenderDto>,
  ): Promise<void> {
    await this.changeSenderValidatedUseCase.execute(input).catch(errorCallback);
  }

  public async findSenderByClientUid(
    client_uid: string,
  ): Promise<DefaultSenderDto> {
    const result = await this.findSenderByClientUidUseCase
      .execute(client_uid)
      .catch(errorCallback);

    return result;
  }

  public async patchSender(
    input: Partial<DefaultSenderDto>,
  ): Promise<DefaultSenderDto> {
    return await this.patchSenderUseCase.execute(input).catch(errorCallback);
  }
}

export default SenderService;
