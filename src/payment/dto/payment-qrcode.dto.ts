export class PaymentQrCodeDto {
  clientid: number;
  qrcodeemv: string;
  value: number;
  document: string;
  commentary: string;
  purpose?: string;
  moneyback?: number;
}
