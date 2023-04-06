import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateClientInputDto } from '../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../dtos/create-client-output.dto';
import { DefaultClientDto } from '../dtos/default-client.dto';
import { FindManyInputDto } from '../dtos/find-many-input.dto';
import { FindManyOutputDto } from '../dtos/find-many-output.dto';
import CreateClient from '../documentation/create-client.documentation';
import DeleteClient from '../documentation/delete-client.documentation';
import GetAllClients from '../documentation/find-all-clients.documentation';
import FindManyClients from '../documentation/find-many-clients.documentation';
import FindByClient from '../documentation/find-one-by-client.documentation';
import FindByUid from '../documentation/find-one-by-uid.documentation';
import FindByHost from '../documentation/find-one-by-host.documentation';
import ClientService from '../services/client.service';
import PatchClient from '../documentation/patch-client.documentation';

@Controller({ path: 'client', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Create a new client
  @Post('create-client')
  @HttpCode(HttpStatus.CREATED)
  @CreateClient.Doc()
  async createClient(
    @Body() createClientInputDto: CreateClientInputDto,
  ): Promise<CreateClientOutputDto> {
    return await this.clientService.createClient(createClientInputDto);
  }

  // Delete a client with the given UID
  @Delete('delete-client/:uid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteClient.Doc()
  async deleteClient(@Param('uid') uid: string): Promise<void> {
    return await this.clientService.deleteClient(uid);
  }

  // Find all clients
  @Get('find-all-clients')
  @HttpCode(HttpStatus.OK)
  @GetAllClients.Doc()
  async findAllClients(): Promise<DefaultClientDto[]> {
    return await this.clientService.findAllClients();
  }

  // Find multiple clients that match the given criteria
  @Post('find-many-clients')
  @HttpCode(HttpStatus.OK)
  @FindManyClients.Doc()
  async findManyClients(
    @Body() input: FindManyInputDto,
  ): Promise<FindManyOutputDto> {
    return await this.clientService.findManyClients(input);
  }

  // Find a client with the given client ID
  @Post('find-by-client/:client')
  @HttpCode(HttpStatus.OK)
  @FindByClient.Doc()
  async findOneByClient(
    @Param('client') client: string,
  ): Promise<DefaultClientDto> {
    return await this.clientService.findOneClientByClient(client);
  }

  // Find a client with the given UID
  @Post('find-by-uid/:uid')
  @HttpCode(HttpStatus.OK)
  @FindByUid.Doc()
  async findOneById(@Param('uid') uid: string): Promise<DefaultClientDto> {
    return await this.clientService.findOneClientByUid(uid);
  }

  // Find a client with the given host name
  @Post('find-by-host')
  @HttpCode(HttpStatus.OK)
  @FindByHost.Doc()
  async findOneByHost(
    @Body() input: { host: string },
  ): Promise<DefaultClientDto> {
    return await this.clientService.findOneClientByHost(input.host);
  }

  // Update a client with the given UID
  @Patch('update-client/:uid')
  @HttpCode(HttpStatus.OK)
  @PatchClient.Doc()
  async updateClient(
    @Param('uid') uid: string,
    @Body() client: Partial<DefaultClientDto>,
  ): Promise<DefaultClientDto> {
    client.uid = uid;
    return await this.clientService.patchClient(client);
  }
}

export default ClientController;
