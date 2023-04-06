import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CreateClientInputDto } from '../../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../../dtos/create-client-output.dto';
import ClientController from '../client.controller';
import ClientService from '../../services/client.service';
import CreateClientUseCase from '../../../../../domain/usecases/client/create-client.use-case';

describe('ClientController', () => {
  const basePath = 'ms-mail-gateway/v1/client';
  let app: INestApplication;
  let clientController: ClientController;
  let clientService: ClientService;
  let httpServer: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService, CreateClientUseCase],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
    clientController = moduleFixture.get<ClientController>(ClientController);
    clientService = moduleFixture.get<ClientService>(ClientService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('create client', () => {
    const createClientInputDto: CreateClientInputDto = {
      host: 'https://example.com',
      client: 'Example',
      apiSecret: '370268e9-1612-4c37-8d60-15fbdeae3659',
    };

    const createClientOutputDto: CreateClientOutputDto = {
      uid: '370268e9-1612-4c37-8d60-15fbdeae3659',
      host: 'https://example.com',
      client: 'Example',
      apiKey: '$2b$10$TWyjqjJcWMOPtv8PElzU2OGNrTbz9D3KvJdjXPLHAyD5j5LD5hJV.',
      apiSecret: '$2b$10$p9jltpv/Ysu7TGaDP1VWIuQFIkAx.jEzdJv2nlus7ETsjL8ly7fpW',
      createdAt: new Date('2023-03-29T11:10:49.769Z'),
      updatedAt: new Date('2023-03-29T11:10:49.769Z'),
    };

    it('should create a client', async () => {
      jest
        .spyOn(clientService, 'createClient')
        .mockResolvedValue(createClientOutputDto);

      const response = await request(httpServer)
        .post(`${basePath}/create-client`)
        .send(createClientInputDto);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(createClientOutputDto);
    });
  });
});
