import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateClientInputDto } from '../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../dtos/create-client-output.dto';
import { DefaultClientDto } from '../dtos/default-client.dto';
import CreateClient from '../documentation/create-client.documentation';
import DeleteClient from '../documentation/delete-client.documentation';
import GetAllClients from '../documentation/find-all-clients.documentation';
import ClientService from '../services/client.service';

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
    return this.clientService.createClient(createClientInputDto);
  }

  @Delete('delete-client/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteClient.Doc()
  async deleteClient(@Param('id') id: string): Promise<void> {
    return this.clientService.deleteClient(id);
  }

  @Get('find-all-clients')
  @HttpCode(HttpStatus.OK)
  @GetAllClients.Doc()
  async findAllClients(): Promise<DefaultClientDto[]> {
    return this.clientService.findAllClients();
  }
}

export default ClientController;
