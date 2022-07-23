import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileLimitsController } from './profile-limits.controller';

describe('ProfileLimitsCommandController', () => {
  let app: INestApplication;
  let controller: ProfileLimitsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileLimitsController],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<ProfileLimitsController>(ProfileLimitsController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should reject requests without payload`, () => {
    return request(app.getHttpServer())
      .post('/v1/customer/limits')
      .expect(400);
  });

  it(`should reject requests with empty document on payload`, () => {
    return request(app.getHttpServer())
      .post('/v1/customer/limits')
      .send({ checkingAccountUuid: '' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: '"document" is not allowed to be empty',
        error: 'Bad Request',
      });
  });

  it(`should reject requests with empty limit type on payload`, () => {
    return request(app.getHttpServer())
      .post('/v1/customer/limits')
      .send({ limitType: '' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: '"limitType" is not allowed to be empty',
        error: 'Bad Request',
      });
  });

  it(`should reject requests with empty current limit on payload`, () => {
    return request(app.getHttpServer())
      .post('/v1/customer/limits')
      .send({ currentLimit: '' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: '"currentLimit" is not allowed to be empty',
        error: 'Bad Request',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
