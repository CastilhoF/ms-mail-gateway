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
import FindById from '../documentation/find-one-by-id.documentation';
import FindByHost from '../documentation/find-one-by-host.documentation';
import ClientService from '../services/client.service';
import PatchClient from '../documentation/patch-client.documentation';

@Controller({ path: 'client', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create-client')
  @HttpCode(HttpStatus.CREATED)
  @CreateClient.Doc()
  async createClient(
    createClientInputDto: CreateClientInputDto,
  ): Promise<CreateClientOutputDto> {
    return await this.clientService.createClient(createClientInputDto);
  }

  @Delete('delete-client/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteClient.Doc()
  async deleteClient(@Param('id') id: string): Promise<void> {
    return await this.clientService.deleteClient(id);
  }

  @Get('find-all-clients')
  @HttpCode(HttpStatus.OK)
  @GetAllClients.Doc()
  async findAllClients(): Promise<DefaultClientDto[]> {
    return await this.clientService.findAllClients();
  }

  @Post('find-many-clients')
  @HttpCode(HttpStatus.OK)
  @FindManyClients.Doc()
  async findManyClients(
    @Body() input: FindManyInputDto,
  ): Promise<FindManyOutputDto> {
    return await this.clientService.findManyClients(input);
  }

  @Post('find-by-client/:client')
  @HttpCode(HttpStatus.OK)
  @FindByClient.Doc()
  async findOneByClient(
    @Param('client') client: string,
  ): Promise<DefaultClientDto> {
    return await this.clientService.findOneClientByClient(client);
  }

  @Post('find-by-id/:id')
  @HttpCode(HttpStatus.OK)
  @FindById.Doc()
  async findOneById(@Param('id') id: string): Promise<DefaultClientDto> {
    return await this.clientService.findOneClientById(id);
  }

  @Post('find-by-host/:host')
  @HttpCode(HttpStatus.OK)
  @FindByHost.Doc()
  async findOneByHost(@Param('host') host: string): Promise<DefaultClientDto> {
    return await this.clientService.findOneClientByHost(host);
  }

  @Patch('update-client/:id')
  @HttpCode(HttpStatus.OK)
  @PatchClient.Doc()
  async updateClient(
    @Param('id') id: string,
    @Body() client: Partial<DefaultClientDto>,
  ): Promise<DefaultClientDto> {
    client.id = id;
    return await this.clientService.patchClient(client);
  }
}

export default ClientController;
