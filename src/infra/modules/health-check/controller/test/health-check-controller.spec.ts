import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '../health-check.controller';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

describe('monitoring controller', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [CacheModule, { provide: CACHE_MANAGER, useValue: {} }],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a status 200', () => {
    expect(controller.healthCheck()).resolves.toEqual(undefined);
  });
});
