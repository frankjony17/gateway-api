import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { auth, hasAuthorization } from '../middleware';

import { SchedulerController } from './scheduler.controller';

@Module({
  controllers: [SchedulerController],
})
export class SchedulerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).forRoutes(
      {
        path: 'v1/scheduler/account/:accountId/qr-code/dynamic',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/scheduler/account/:accountId/qr-code/static',
        method: RequestMethod.POST,
      },
    );
    consumer.apply(hasAuthorization('CARD.POST', 'PASSWORD_CARD')).forRoutes(
      {
        path: 'v1/scheduler/account/:accountId/qr-code/dynamic',
        method: RequestMethod.POST,
      },
      {
        path: 'v1/scheduler/account/:accountId/qr-code/static',
        method: RequestMethod.POST,
      },
    );
  }
}
