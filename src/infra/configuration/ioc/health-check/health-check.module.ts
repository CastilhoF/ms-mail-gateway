import { Module } from '@nestjs/common';
import { HealthCheckController } from '../../../modules/health-check/controller/health-check.controller';

@Module({
  controllers: [HealthCheckController],
})
class HealthCheckModule {}

export default HealthCheckModule;
