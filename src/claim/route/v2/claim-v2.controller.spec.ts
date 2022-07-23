import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ClaimV2Controller } from './claim-v2.controller';
import { INestApplication } from '@nestjs/common';

describe('ClaimV2Controller', () => {
  let app: INestApplication;
    let controller: ClaimV2Controller;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [ClaimV2Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

      controller = module.get<ClaimV2Controller>(ClaimV2Controller);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Confirmed', () => {
    it(`should reject requests without document on payload`, () => {
      return request(app.getHttpServer())
        .post('/v2/claims/:claimid/confirmed')
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty document on payload`, () => {
      return request(app.getHttpServer())
        .post('/v2/claims/:claimid/confirmed')
        .send({ document: '' })
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is not allowed to be empty',
          error: 'Bad Request',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
