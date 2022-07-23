import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ClaimV1Controller } from './claim-v1.controller';
import { INestApplication } from '@nestjs/common';

describe('ClaimV1Controller', () => {
  let app: INestApplication;
    let controller: ClaimV1Controller;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [ClaimV1Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

      controller = module.get<ClaimV1Controller>(ClaimV1Controller);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Confirmed', () => {
    it(`should reject requests without document on payload`, () => {
      return request(app.getHttpServer())
        .post('/v1/claims/:claimid/confirmed')
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty document on payload`, () => {
      return request(app.getHttpServer())
        .post('/v1/claims/:claimid/confirmed')
        .send({ document: '' })
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is not allowed to be empty',
          error: 'Bad Request',
        });
    });
  });

  describe('Completed', () => {
    it(`should reject requests without document on payload`, () => {
      const claimId = '29EDB355-CF28-41D4-8E34-051648F0A94F';
      const url = `/v1/claims/${claimId}/completed`;

      return request(app.getHttpServer())
        .post(url)
        .expect(400);
    });

    it(`should reject requests with empty document on payload`, () => {
      const claimId = '29EDB355-CF28-41D4-8E34-051648F0A94F';
      const url = `/v1/claims/${claimId}/completed`;

      return request(app.getHttpServer())
        .post(url)
        .send({ document: '' })
        .expect(400);
    });
  });

  describe('Status', () => {
    it(`should reject requests without document on payload`, () => {
      const claimId = '29EDB355-CF28-41D4-8E34-051648F0A94F';
      const url = `/v1/claims/${claimId}`;
      return request(app.getHttpServer())
        .post(url)
        .expect(400);
    });

    it(`should reject requests with empty document on payload`, () => {
      const claimId = '29EDB355-CF28-41D4-8E34-051648F0A94F';
      const url = `/v1/claims/${claimId}`;
      return request(app.getHttpServer())
        .post(url)
        .send({ document: '' })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
