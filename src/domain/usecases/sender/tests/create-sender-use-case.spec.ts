import { mock, MockProxy } from 'jest-mock-extended';
import CreateSenderUseCase from '../create-sender.use-case';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import SenderEntity from '../../../../domain/entities/sender/sender.entity';
import DomainException from '../../../../domain/entities/shared/exceptions/domain.exception';
import { DefaultSenderDto } from '../dtos/default-sender.dto';

describe('Create Sender Use Case', () => {
  let senderRepository: MockProxy<SenderRepository> | null = null;

  beforeEach(() => {
    senderRepository = mock<SenderRepository>();
  });

  it('should return the created sender', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@doamin.com';
    const senderService = 'Sendgrid';

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const createSenderOutput = createSenderInput;

    const senderMock: SenderEntity = new SenderEntity(
      createSenderInput.uid,
      createSenderInput.name,
      createSenderInput.email,
      createSenderInput.service,
      createSenderInput.senderApiKey,
      createSenderInput.validated,
      createSenderInput.clientUid,
      createSenderInput.createdAt,
      createSenderInput.updatedAt,
    );

    const saveSenderMock =
      senderRepository.save.mockResolvedValueOnce(senderMock);

    const useCase = new CreateSenderUseCase(senderRepository);

    const resultExpect: DefaultSenderDto = await useCase.execute(
      createSenderInput,
    );

    expect(saveSenderMock).toHaveBeenCalledTimes(1);
    expect(resultExpect).toEqual(createSenderOutput);

    expect.assertions(2);
  });

  it('should throw an error when the sender name is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = null;
    const senderEmail = 'sender@doamin.com';
    const senderService = 'Sendgrid';

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey: null,
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey: undefined,
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
      );

    const exception = new DomainException('senderApiKey is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender validated is not provided - null', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: null,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
      );

    const exception = new DomainException('validated is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });

  it('should throw an error when the sender validated is not provided - undefined', async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const senderUid = '355242a5-4d0d-4199-bced-166ba023267d';
    const senderName = 'Sender Name';
    const senderEmail = 'sender@domain.com';
    const senderService = 'Sendgrid';

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: undefined,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
      );

    const exception = new DomainException('validated is required');

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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: null,
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: undefined,
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
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

    const createSenderInput: DefaultSenderDto = {
      uid: senderUid,
      name: senderName,
      email: senderEmail,
      service: senderService,
      senderApiKey:
        '446f1542-fb57-4e10-9d2e-5ff7e9939bb2.355242a5-4d0d-4199-bced-166ba023267d',
      validated: true,
      clientUid: '355242a5-4d0d-4199-bced-166ba023267d',
      createdAt,
      updatedAt,
    };

    const senderMock = () =>
      new SenderEntity(
        createSenderInput.uid,
        createSenderInput.name,
        createSenderInput.email,
        createSenderInput.service,
        createSenderInput.senderApiKey,
        createSenderInput.validated,
        createSenderInput.clientUid,
        createSenderInput.createdAt,
        createSenderInput.updatedAt,
      );

    const exception = new DomainException('updatedAt is required');

    expect(() => senderMock()).toThrowError(exception);

    expect.assertions(1);
  });
});
