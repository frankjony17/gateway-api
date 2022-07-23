import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AccessKeyModule } from './access-key/access-key.module';
import { ClaimModule } from './claim/claim.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
import { QrCodeModule } from './qr-code/qr-code.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { UtilitiesModule } from './utilities/utilities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccessKeyModule,
    ClaimModule,
    CustomerModule,
    PaymentModule,
    QrCodeModule,
    SchedulerModule,
    UtilitiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
