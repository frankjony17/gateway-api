import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { hasAuthorization, auth } from '../middleware';
import { ConfigService } from '@nestjs/config';

var twoFaEnabled: string;

@Module({
  controllers: [PaymentController]
})
export class PaymentModule implements NestModule {
  constructor(configService: ConfigService) {
    twoFaEnabled = configService.get('SIDECAR_2FA_ENABLED');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).forRoutes(
      {
        path: 'v1/payments/account/:accountId/qr-code',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/payments/account/:accountId/bank-account',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/payments/account/:accountId/access-key',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/payments/account/:accountId/refund',
        method: RequestMethod.POST,
      },
    );
    if (twoFaEnabled == 'true') {
      consumer.apply(hasAuthorization('CARD.POST', 'PASSWORD_CARD')).forRoutes(
        {
          path: 'v1/payments/account/:accountId/qr-code',
          method: RequestMethod.POST,
        },
        {
          path: 'v1/payments/account/:accountId/bank-account',
          method: RequestMethod.POST,
        },
        {
          path: 'v1/payments/account/:accountId/access-key',
          method: RequestMethod.POST,
        },
        {
          path: 'v1/payments/account/:accountId/refund',
          method: RequestMethod.POST,
        },
      );
    }
  }
}
