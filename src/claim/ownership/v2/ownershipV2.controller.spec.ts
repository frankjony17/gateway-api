import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OwnershipV2Controller } from './ownershipV2.controller';

describe('OwnershipV2Controller', () => {
  let app: INestApplication;
  let controller: OwnershipV2Controller;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnershipV2Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<OwnershipV2Controller>(OwnershipV2Controller);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should reject requests without payload`, () => {
    return request(app.getHttpServer())
      .post('/v2/ownership/start')
      .expect(400);
  });

  it(`should reject requests without document on payload`, () => {
    return request(app.getHttpServer())
      .post('/v2/ownership/start')
      .expect(400)
      .expect({
        statusCode: 400,
        message: '"document" is required',
        error: 'Bad Request',
      });
  });

  it(`should reject requests with empty document on payload`, () => {
    return request(app.getHttpServer())
      .post('/v2/ownership/start')
      .send({ document: '' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: '"document" is not allowed to be empty',
        error: 'Bad Request',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
