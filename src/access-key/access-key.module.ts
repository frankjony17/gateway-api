import { Module } from '@nestjs/common';
import { AccessKeyV1Controller } from './v1/access-keyV1.controller';
import { AccessKeyV2Controller } from './v2/access-keyV2.controller';

@Module({
  controllers: [AccessKeyV1Controller, AccessKeyV2Controller],
})
export class AccessKeyModule {}
