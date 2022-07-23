import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeyV1Controller } from './access-keyV1.controller';

describe('AccessKeyController', () => {
  let controller: AccessKeyV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessKeyV1Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<AccessKeyV1Controller>(AccessKeyV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
