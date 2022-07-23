import { Module } from '@nestjs/common';
import { QrCodeV1Controller } from './v1/qr-codeV1.controller';
import { QrCodeV2Controller } from './v2/qr-codeV2.controller';

@Module({
  controllers: [QrCodeV1Controller, QrCodeV2Controller],
})
export class QrCodeModule {}
