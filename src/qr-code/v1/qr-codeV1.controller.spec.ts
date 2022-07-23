import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { QrCodeV1Controller } from './qr-codeV1.controller';
import { INestApplication } from '@nestjs/common';

describe('QrCodeV1Controller', () => {
  let controller: QrCodeV1Controller;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrCodeV1Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<QrCodeV1Controller>(QrCodeV1Controller);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Decode', () => {
    const url = '/v1/qr-code/decode';

    it(`should reject requests without document on payload`, () => {
      const postBody = {
        base64:
          'MDAwMjAxMjY1NzAwMTRCUi5HT1YuQkNCLlBJWDAxMTE0MDM5MTA3MTg3NDAyMjBURVNURSBERVNDUklQVElPTiAwMjUyMDQwMDAwNTMwMzk4NjU0MDQwLjAwNTgwMkJSNTkxM1JFTkFUTyBaSVRST042MDA2QlJBU0lMNjI2MzA1MjUyMDIwMTEwNzEzMTU0UFJNNVZIRU9PTVFUNTAzMDAwMTdCUi5HT1YuQkNCLkJSQ09ERTAxMDUxLjAuMDYzMDQzMTMx',
        imageText: '',
        emv: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty document on payload`, () => {
      const postBody = {
        document: '',
        base64:
          'MDAwMjAxMjY1NzAwMTRCUi5HT1YuQkNCLlBJWDAxMTE0MDM5MTA3MTg3NDAyMjBURVNURSBERVNDUklQVElPTiAwMjUyMDQwMDAwNTMwMzk4NjU0MDQwLjAwNTgwMkJSNTkxM1JFTkFUTyBaSVRST042MDA2QlJBU0lMNjI2MzA1MjUyMDIwMTEwNzEzMTU0UFJNNVZIRU9PTVFUNTAzMDAwMTdCUi5HT1YuQkNCLkJSQ09ERTAxMDUxLjAuMDYzMDQzMTMx',
        imageText: '',
        emv: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is not allowed to be empty',
          error: 'Bad Request',
        });
    });
  });

  describe('Static', () => {
    const url = '/v1/qr-code/static';

    it(`should reject requests without document on payload`, () => {
      const postBody = {
        key: '47879876820',
        name: 'Teste',
        description: 'Teste',
        value: 0.1,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty document on payload`, () => {
      const postBody = {
        document: '',
        key: '47879876820',
        name: 'Teste',
        description: 'Teste',
        value: 0.1,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"document" is not allowed to be empty',
          error: 'Bad Request',
        });
    });

    it(`should reject requests without key on payload`, () => {
      const postBody = {
        document: '47879876820',
        name: 'Teste',
        description: 'Teste',
        value: 0.1,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"key" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty key on payload`, () => {
      const postBody = {
        document: '47879876820',
        key: '',
        name: 'Teste',
        description: 'Teste',
        value: 0.1,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"key" is not allowed to be empty',
          error: 'Bad Request',
        });
    });

    it(`should reject requests without value on payload`, () => {
      const postBody = {
        document: '47879876820',
        key: '47879876820',
        name: 'Teste',
        description: 'Teste',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"value" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with null value on payload`, () => {
      const postBody = {
        document: '47879876820',
        key: '47879876820',
        name: 'Teste',
        description: 'Teste',
        value: null,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"value" must be a number',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with value less than zero on payload`, () => {
      const postBody = {
        document: '47879876820',
        key: '47879876820',
        name: 'Teste',
        description: 'Teste',
        value: -1,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400)
        .expect({
          statusCode: 400,
          message: '"value" must be larger than or equal to 0',
          error: 'Bad Request',
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
