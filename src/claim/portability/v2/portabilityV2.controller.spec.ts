import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PortabilityV2Controller } from './portabilityV2.controller';

describe('PortabilityV2Controller', () => {
  let controller: PortabilityV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortabilityV2Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<PortabilityV2Controller>(PortabilityV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
