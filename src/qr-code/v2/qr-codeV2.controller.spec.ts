import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { QrCodeV2Controller } from './qr-codeV2.controller';
import { INestApplication } from '@nestjs/common';

describe('QrCodeV2Controller', () => {
  let controller: QrCodeV2Controller;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrCodeV2Controller],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<QrCodeV2Controller>(QrCodeV2Controller);
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

  afterEach(async () => {
    await app.close();
  });
});
