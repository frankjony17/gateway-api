import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeyV2Controller } from './access-keyV2.controller';

describe('AccessKeyController', () => {
  let controller: AccessKeyV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessKeyV2Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<AccessKeyV2Controller>(AccessKeyV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
