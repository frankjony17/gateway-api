import { Module } from '@nestjs/common';
import { ProfileLimitsController } from './profile-limits/profile-limits.controller';

@Module({
  controllers: [ProfileLimitsController],
})
export class CustomerModule {}
