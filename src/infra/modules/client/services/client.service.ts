import { Injectable } from '@nestjs/common';
import { errorCallback } from '../../helpers/exceptions/exception.callback';
import { CreateClientInputDto } from '../../../../domain/usecases/client/dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../../../../domain/usecases/client/dtos/create-client-output.dto';
import { DefaultClientDto } from '../../../../domain/usecases/client/dtos/default-client.dto';
import { FindManyInputDto } from '../../../../domain/usecases/client/dtos/find-many-input.dto';
import { FindManyOutputDto } from '../../../../domain/usecases/client/dtos/find-many-output.dto';
import CreateClientUseCase from '../../../../domain/usecases/client/create-client.use-case';
import DeleteClientUseCase from '../../../../domain/usecases/client/delete-client.use-case';
import FindAllClientsUseCase from '../../../../domain/usecases/client/find-all-clients.use-case';
import FindManyClientsUseCase from '../../../../domain/usecases/client/find-many-clients.use-case';
import FindOneClientByClientUseCase from '../../../../domain/usecases/client/find-one-client-by-client.use-case';
import FindOneClientByUidUseCase from '../../../../domain/usecases/client/find-one-client-by-uid.use-case';
import FindOneClientByHostUseCase from '../../../../domain/usecases/client/find-one-client-by-host.use-case';
import PatchClientUseCase from '../../../../domain/usecases/client/patch-client.use-case';
import FindOneClientByApiKeyUseCase from '../../../../domain/usecases/client/find-one-client-by-api-key.use-case';

@Injectable()
class ClientService {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
    private readonly findAllClientsUseCase: FindAllClientsUseCase,
    private readonly findManyClientsUseCase: FindManyClientsUseCase,
    private readonly findOneClientByClientUseCase: FindOneClientByClientUseCase,
    private readonly findOneClientByUidUseCase: FindOneClientByUidUseCase,
    private readonly findOneClientByHostUseCase: FindOneClientByHostUseCase,
    private readonly findOneClientByApiKeyUseCase: FindOneClientByApiKeyUseCase,
    private readonly patchClientUseCase: PatchClientUseCase,
  ) {}

  public async createClient(
    input: CreateClientInputDto,
  ): Promise<CreateClientOutputDto> {
    const result = await this.createClientUseCase
      .execute(input)
      .catch(errorCallback);

    return result;
  }

  public async deleteClient(uid: string): Promise<void> {
    await this.deleteClientUseCase.execute(uid).catch(errorCallback);
  }

  public async findAllClients(): Promise<DefaultClientDto[]> {
    const result = await this.findAllClientsUseCase
      .execute()
      .catch(errorCallback);

    return result;
  }

  public async findManyClients(
    input: FindManyInputDto,
  ): Promise<FindManyOutputDto> {
    const result = await this.findManyClientsUseCase
      .execute(input)
      .catch(errorCallback);

    return result;
  }

  public async findOneClientByClient(
    client: string,
  ): Promise<DefaultClientDto> {
    const result = await this.findOneClientByClientUseCase
      .execute(client)
      .catch(errorCallback);

    return result;
  }

  public async findOneClientByUid(uid: string): Promise<DefaultClientDto> {
    const result = await this.findOneClientByUidUseCase
      .execute(uid)
      .catch(errorCallback);

    return result;
  }

  public async findOneClientByHost(host: string): Promise<DefaultClientDto> {
    const result = await this.findOneClientByHostUseCase
      .execute(host)
      .catch(errorCallback);

    return result;
  }

  public async findOneClientByApiKey(
    apiKey: string,
  ): Promise<DefaultClientDto> {
    const result = await this.findOneClientByApiKeyUseCase
      .execute(apiKey)
      .catch(errorCallback);

    return result;
  }

  public async patchClient(
    input: Partial<DefaultClientDto>,
  ): Promise<DefaultClientDto> {
    return await this.patchClientUseCase.execute(input).catch(errorCallback);
  }
}

export default ClientService;
