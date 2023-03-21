import { Test, TestingModule } from '@nestjs/testing';
import UidGeneratorService from '../uid-generator.service';
import UidGeneratorInterface from '../../../../../app/shared/interfaces/uid-generator.interface';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UidGeneratorService', () => {
  let service: UidGeneratorService;
  let uidGeneratorMock: MockProxy<UidGeneratorInterface>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UidGeneratorService,
        {
          provide: 'UidGeneratorInterface',
          useValue: uidGeneratorMock,
        },
      ],
    }).compile();

    service = module.get<UidGeneratorService>(UidGeneratorService);
    uidGeneratorMock = mock<UidGeneratorInterface>();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generate', () => {
    it('should return a valid UUID', async () => {
      const uuid = await service.generate();

      uidGeneratorMock.generate.mockResolvedValue(uuid);

      expect(uuid).toBe(uuid);
    });
  });
});
