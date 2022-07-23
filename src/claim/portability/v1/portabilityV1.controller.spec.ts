import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PortabilityV1Controller } from './portabilityV1.controller';

describe('PortabilityV1Controller', () => {
  let controller: PortabilityV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortabilityV1Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<PortabilityV1Controller>(PortabilityV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
