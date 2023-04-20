import { mock, MockProxy } from 'jest-mock-extended';
import CreateSenderUseCase from '../create-sender.use-case';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';
import DomainException from '../../../../domain/entities/shared/exceptions/domain.exception';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import UidGeneratorInterface from '../../../../app/shared/interfaces/uid-generator.interface';
import { CreateSenderInputDto } from '../dtos/create-sender-input.dto.ts';

describe('Create Sender Use Case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;
  let uidGenerator: MockProxy<UidGeneratorInterface> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
    uidGenerator = mock<UidGeneratorInterface>();
  });

  it('should return the created sender', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@doamin.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock: SenderEntity = new SenderEntity(
      senderUid,
      createSenderInput.name,
      createSenderInput.email,
      createSenderInput.service,
      createSenderInput.senderApiKey,
      false,
      createSenderInput.clientUid,
      createdAt,
      updatedAt,
    );

    const senderOutputMock: DefaultSenderDto = new DefaultSenderDto(
      senderUid,
      createSenderInput.name,
      createSenderInput.email,
      createSenderInput.service,
      createSenderInput.senderApiKey,
      false,
      createSenderInput.clientUid,
      createdAt,
      updatedAt,
    );

    jest.spyOn(uidGenerator, 'generate').mockResolvedValueOnce(senderUid);

    const saveSenderMock =
      senderRepository.save.mockResolvedValueOnce(senderMock);

    const useCase = new CreateSenderUseCase(senderRepository, uidGenerator);

    const resultExpect: DefaultSenderDto = await useCase.execute(
      createSenderInput,
    );

    expect(saveSenderMock).toHaveBeenCalledTimes(1);
    expect(resultExpect).toEqual(senderOutputMock);

    expect.assertions(2);
  });

  it('should throw an error when the sender name is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = null;
    const senderEmail = 'sender@doamin.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('name is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender name is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = undefined;
    const senderEmail = 'sender@doamin.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('name is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender email is not valid', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender.domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('email is not valid');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender email is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = null;
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('email is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender email is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = undefined;
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('email is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender service is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = null;

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('service is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender service is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = undefined;

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('service is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender api key is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey: null,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('senderApiKey is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender api key is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey: undefined,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('senderApiKey is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender clientUid is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: null,
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('clientUid is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender clientUid is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: undefined,
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('clientUid is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender createdAt is not provided - null', async () => {
    const createdAt = null;
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('createdAt is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender createdAt is not provided - undefined', async () => {
    const createdAt = undefined;
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('createdAt is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender updatedAt is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = null;
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('updatedAt is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender updatedAt is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = undefined;
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: CreateSenderInputDto = {
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
    };

    const senderMock = () =>
      new SenderEntity(
        senderUid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        false,
        createSenderInput.clientUid,
        createdAt,
        updatedAt,
      );

    const exception = new DomainException('updatedAt is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });
});
