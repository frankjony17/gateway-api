import { Module } from '@nestjs/common';
import { UtilitiesController } from './utilities.controller';

@Module({
  controllers: [UtilitiesController],
  providers: [],
})
export class UtilitiesModule {}
