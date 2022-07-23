import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { INestApplication } from '@nestjs/common';

describe('PaymentController', () => {
  let app: INestApplication;
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('QRCode', () => {
    const url = '/v1/payments/account/:accountId/qr-code';

    it(`should reject requests without document on payload`, () => {
      const postBody = {
        clientid: 6718,
        qrcodeemv:
          '00020126560014BR.GOV.BCB.api0123CLAUDINEI@CLAUDINEI.COM0207COMPRA152040000530398654071000.005802BR5922HENRIQUE AUGUSTO COCEV6006BRASIL62630525202011111239C7XB8QHYXVRQA50300017BR.GOV.BCB.BRCODE01051.0.06304A1F1',
        value: 0.1,
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests with empty document on payload`, () => {
      const postBody = {
        clientid: 6718,
        qrcodeemv:
          '00020126560014BR.GOV.BCB.api0123CLAUDINEI@CLAUDINEI.COM0207COMPRA152040000530398654071000.005802BR5922HENRIQUE AUGUSTO COCEV6006BRASIL62630525202011111239C7XB8QHYXVRQA50300017BR.GOV.BCB.BRCODE01051.0.06304A1F1',
        value: 0.1,
        document: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without clientid on payload`, () => {
      const postBody = {
        qrcodeemv:
          '00020126560014BR.GOV.BCB.api0123CLAUDINEI@CLAUDINEI.COM0207COMPRA152040000530398654071000.005802BR5922HENRIQUE AUGUSTO COCEV6006BRASIL62630525202011111239C7XB8QHYXVRQA50300017BR.GOV.BCB.BRCODE01051.0.06304A1F1',
        value: 0.1,
        document: '12345678910',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without qrcodeemv on payload`, () => {
      const postBody = {
        clientid: 6718,
        value: 0.1,
        document: '12345678910',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without value on payload`, () => {
      const postBody = {
        clientid: 6718,
        qrcodeemv:
          '00020126560014BR.GOV.BCB.api0123CLAUDINEI@CLAUDINEI.COM0207COMPRA152040000530398654071000.005802BR5922HENRIQUE AUGUSTO COCEV6006BRASIL62630525202011111239C7XB8QHYXVRQA50300017BR.GOV.BCB.BRCODE01051.0.06304A1F1',
        document: '12345678910',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });
  });

  describe('AccessKey', () => {
    it(`should reject requests without debtor document on payload`, () => {
      const body = {
        documentCreditor: '47879876820',
        keyId: '47879876820',
        type: 'CPF',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"documentDebtor" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty debtor document on payload`, () => {
      const body = {
        documentDebtor: '',
        documentCreditor: '47879876820',
        keyId: '47879876820',
        type: 'CPF',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"documentDebtor" is not allowed to be empty',
          error: 'Bad Request',
        });
    });

    it(`should reject requests without creditor document on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        keyId: '47879876820',
        type: 'CPF',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"documentCreditor" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty creditor document on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '',
        keyId: '47879876820',
        type: 'CPF',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"documentCreditor" is not allowed to be empty',
          error: 'Bad Request',
        });
    });

    it(`should reject requests without key id on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        type: 'CPF',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"keyId" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty key id on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        keyId: '',
        type: 'CPF',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"keyId" is not allowed to be empty',
          error: 'Bad Request',
        });
    });

    it(`should reject requests without key type on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        keyId: '47879876820',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"type" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with empty key type on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        keyId: '47879876820',
        type: '',
        value: 10,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"type" is not allowed to be empty',
          error: 'Bad Request',
        });
    });

    it(`should reject requests without value on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        keyId: '47879876820',
        type: 'CPF',
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"value" is required',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with null value on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        keyId: '47879876820',
        type: 'CPF',
        value: null,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"value" must be a number',
          error: 'Bad Request',
        });
    });

    it(`should reject requests with value less than zero on payload`, () => {
      const body = {
        documentDebtor: '39643461874',
        documentCreditor: '47879876820',
        keyId: '47879876820',
        type: 'CPF',
        value: 0,
        commentary: "Mensagem Teste"
      };
      const url = `/v1/payments/account/:accountId/access-key`;

      return request(app.getHttpServer())
        .post(url)
        .send(body)
        .expect({
          statusCode: 400,
          message: '"value" must be greater than 0',
          error: 'Bad Request',
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
