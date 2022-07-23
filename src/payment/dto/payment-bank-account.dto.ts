export class PaymentBankAccounDto {
  document: string;
  account: AccountDto;
  creditor: CreditorDto;
  value: number;
  commentary: string;
}

export class AccountDto {
  bankcode: string;
  ispb: string;
  agency: string;
  account: string;
  type: string;
}

export class CreditorDto {
  document: string;
  name: string;
}
