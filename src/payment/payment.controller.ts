import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { paymentQrCodeSchema } from './schemas/payment-qrcode.schema';
import { paymentBankAccountSchema } from './schemas/payment-bank-account.schema';
import { paymentAccessKeySchema } from './schemas/payment-access-key.schema';
import { PaymentQrCodeDto } from './dto/payment-qrcode.dto';
import { PaymentBankAccounDto } from './dto/payment-bank-account.dto';
import { PaymentAccessKeyDto } from './dto/payment-access-key.dto';
import { paymentRefundSchema } from './schemas/payment-refunds.schema';
import { PaymentRefundDto } from './dto/payment-refund.dto';

@ApiTags('Payment')
@Controller('v1/payments')
export class PaymentController {
  constructor(private configService: ConfigService) {}

  @Post('account/:accountId/qr-code')
  @ApiParam({ name: 'accountId', type: String })
  async paymentByQrCode(
    @Body(new JoiValidationPipe(paymentQrCodeSchema))
    payload: PaymentQrCodeDto,
    @Res() res: Response,
  ) {
    const paymentCommandUrl = this.configService.get('PAYMENT_COMMAND_URL');
    const url = `${paymentCommandUrl}/v1/payments/qr-code`;
    const headers = { document: payload.document };

    const postBody = {
      clientId: payload.clientid,
      qrCodeEmv: payload.qrcodeemv,
      value: payload.value,
      document: payload.document,
      commentary: payload.commentary,
      purpose: payload.purpose,
      moneyBack: payload.moneyback,
    };

    const providerResponse = await axios.post(url, postBody, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post('account/:accountId/bank-account')
  @ApiParam({ name: 'accountId', type: String })
  async paymentByBankAccount(
    @Body(new JoiValidationPipe(paymentBankAccountSchema))
    payload: PaymentBankAccounDto,
    @Res() res: Response,
  ) {
    const paymentCommand = this.configService.get('PAYMENT_COMMAND_URL');
    const url = `${paymentCommand}/v1/payments/bank-account`;
    const headers = { document: payload.document };
    const body = {
      document: payload.document,
      account: {
        bank: null,
        agency: payload.account.agency,
        account: payload.account.account,
        type: payload.account.type
      },
      creditor: {
        document: payload.creditor.document,
        name: payload.creditor.name,
      },
      value: payload.value,
      commentary: payload.commentary,
    };

    if (payload.account.ispb) {
      body.account.bank = payload.account.ispb;
    } else {
      const bankcode = parseInt(payload.account.bankcode);
      const agency = parseInt(payload.account.agency);

      // Temporário - resolve api por dados bancários entre contas company
      if (bankcode === 655 && agency === 655) {
        body.account.bank = '20855875';
      } else {
        const utilitiesUrl = this.configService.get('UTILITIES_URL');
        const url = `${utilitiesUrl}/v1/bankcode/${payload.account.bankcode}`;
        const utilitiesResponse = await axios.get(url);
        const utilitiesResponseBody = utilitiesResponse.data;

        body.account.bank = utilitiesResponseBody.data.attributes.ispb;
      }
    }

    const providerResponse = await axios.post(url, body, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post('account/:accountId/access-key')
  @ApiParam({ name: 'accountId', type: String })
  async paymentByAccessKey(
    @Body(new JoiValidationPipe(paymentAccessKeySchema))
    payload: PaymentAccessKeyDto,
    @Res() res: Response,
  ) {
    const paymentCommand = this.configService.get('PAYMENT_COMMAND_URL');
    const url = `${paymentCommand}/v1/payments/access-key`;
    const headers = { document: payload.documentDebtor };
    const body = {
      document: payload.documentDebtor,
      key: {
        id: payload.keyId,
        type: payload.type,
      },
      value: payload.value,
      commentary: payload.commentary,
    };

    const providerResponse = await axios.post(url, body, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Get('endtoend/:endtoendid')
  async getEndToEndId(
    @Param('endtoendid') endtoendid: string,
    @Res() res: Response,
  ) {
    const paymentQueryUrl = this.configService.get('PAYMENT_QUERY_URL');
    const url = `${paymentQueryUrl}/v1/payments/${endtoendid}`;

    const providerResponse = await axios.get(url);
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
  }

  @Post('account/:accountId/refund')
  @ApiParam({ name: 'accountId', type: String })
  async postRefund(
    @Body(new JoiValidationPipe(paymentRefundSchema))
    payload: PaymentRefundDto,
    @Res() res: Response,
  ) {
    const paymentCommandUrl = this.configService.get('PAYMENT_COMMAND_URL');
    const url = `${paymentCommandUrl}/v1/refunds`;
    const headers = { document: payload.document };
    const body = {
      document: payload.document,
      endToEndId: payload.endToEndId,
      operationValue: payload.operationValue,
      commentary: payload.commentary ?? '',
    };

    const providerResponse = await axios.post(url, body, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Get('refund/:returnid')
  async getRefundId(@Param('returnid') returnid: string, @Res() res: Response) {
    const paymentQueryUrl = this.configService.get('PAYMENT_QUERY_URL');
    const url = `${paymentQueryUrl}/v1/refund/${returnid}`;

    const providerResponse = await axios.get(url);
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};

    if (!attributes.refund) {
      return res.status(404).json(attributes);
    }

    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
  }

  @Get(':endtoendid/refunds')
  async getRefunds(@Param('endtoendid') e2e: string, @Res() res: Response) {
    const paymentQueryUrl = this.configService.get('PAYMENT_QUERY_URL');
    const url = `${paymentQueryUrl}/v1/payments/${e2e}/transactions`;

    const providerResponse = await axios.get(url);
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody?.data?.attributes ?? {};
    const refunds = attributes?.apiTransactions ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(refunds);
  }
}
