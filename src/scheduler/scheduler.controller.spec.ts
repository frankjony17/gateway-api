import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerController } from './scheduler.controller';

describe('SchedulerController', () => {
  let app: INestApplication;
  let controller: SchedulerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulerController],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<SchedulerController>(SchedulerController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('qrCodeDynamic', () => {
    const url = '/v1/scheduler/account/:accountId/qr-code/dynamic';

    it(`should reject requests without document on payload`, () => {
      const postBody = {
        qrCodeEmv:
          '00020126560014BR.GOV.BCB.api0123CLAUDINEI@CLAUDINEI.COM0207COMPRA152040000530398654071000.005802BR5922HENRIQUE AUGUSTO COCEV6006BRASIL62630525202011111239C7XB8QHYXVRQA50300017BR.GOV.BCB.BRCODE01051.0.06304A1F1',
        scheduleDate: '2021-04-10',
        comment: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without qrCodeEmv on payload`, () => {
      const postBody = {
        document: '12345678910',
        scheduleDate: '2021-04-10',
        comment: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without scheduleDate on payload`, () => {
      const postBody = {
        document: '12345678910',
        qrCodeEmv:
          '00020126560014BR.GOV.BCB.api0123CLAUDINEI@CLAUDINEI.COM0207COMPRA152040000530398654071000.005802BR5922HENRIQUE AUGUSTO COCEV6006BRASIL62630525202011111239C7XB8QHYXVRQA50300017BR.GOV.BCB.BRCODE01051.0.06304A1F1',
        comment: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });
  });

  describe('qrCodeStatic', () => {
    const url = '/v1/scheduler/account/:accountId/qr-code/static';

    it(`should reject requests without document on payload`, () => {
      const postBody = {
        qrCodeEmv:
          '00020126830014br.gov.bcb.api01364004901d-bd85-4769-8e52-cb4c42c506dc0221Jornada pagador 517245204000053039865406977.935802BR5903api6008BRASILIA62290525ed0f1f3a467c44b9ab2c322f6630410A6',
        scheduleDate: '2021-04-10',
        comment: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without qrCodeEmv on payload`, () => {
      const postBody = {
        document: '12345678910',
        scheduleDate: '2021-04-10',
        comment: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });

    it(`should reject requests without scheduleDate on payload`, () => {
      const postBody = {
        document: '12345678910',
        qrCodeEmv:
          '00020126830014br.gov.bcb.api01364004901d-bd85-4769-8e52-cb4c42c506dc0221Jornada pagador 517245204000053039865406977.935802BR5903api6008BRASILIA62290525ed0f1f3a467c44b9ab2c322f6630410A6',
        comment: '',
      };

      return request(app.getHttpServer())
        .post(url)
        .send(postBody)
        .expect(400);
    });
  });

  describe('cancel', () => {
    const schedulerId = 'teste';
    const url = `/v1/scheduler/${schedulerId}/status/cancel`;

    it(`should reject requests with invalid schedulerId`, () => {
      return request(app.getHttpServer())
        .post(url)
        .send()
        .expect(500);
    });
  });

  describe('receipt​', () => {
    it(`should reject requests with invalid schedulerId`, () => {
      const schedulerId = 'teste';
      const checkingAccountUuid = 'teste';
      const url = `/v1/scheduler/${schedulerId}/checking-account/${checkingAccountUuid}/receipt`;
      return request(app.getHttpServer())
        .get(url)
        .send()
        .expect(500);
    });

    it(`should reject requests with invalid checkingAccountUuid`, () => {
      const schedulerId = 123;
      const checkingAccountUuid = 123;
      const url = `/v1/scheduler/${schedulerId}/checking-account/${checkingAccountUuid}/receipt`;
      return request(app.getHttpServer())
        .get(url)
        .send()
        .expect(500);
    });
  });

  describe('future', () => {
    const checkingAccountUuid = 123;
    const url = `/v1/scheduler/checking-account/${checkingAccountUuid}/future`;
    it(`should reject requests with invalid checkingAccountUuid`, () => {
      return request(app.getHttpServer())
        .get(url)
        .send()
        .expect(500);
    });
  });
});
