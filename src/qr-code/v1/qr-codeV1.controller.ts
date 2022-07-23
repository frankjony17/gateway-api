import { Controller, Post, Res, HttpStatus, Body, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { JoiValidationPipe } from '../../joi-validation.pipe';
import { QrCodeDecodeDto } from '../dto/qrcode-decode.dto';
import { qrCodeDecodeSchema } from '../schemas/qrcode-decode.schema';
import { qrCodeCreateValidationSchema } from '../schemas/qrcode-create-validation.schema';
import { QrCodeCreateDto } from '../dto/qrcode-create.dto';

@ApiTags('QRCode')
@Controller('v1/qr-code')
export class QrCodeV1Controller {
  constructor(private configService: ConfigService) {}

  @Post('static')
  async Create(
    @Body(new JoiValidationPipe(qrCodeCreateValidationSchema))
    payload: QrCodeCreateDto,
    @Res() res: Response,
  ) {
    const transactionQrCode = this.configService.get('TRANSACTION_QRCODE_URL');
    const url = `${transactionQrCode}/v1/qr-codes`;
    const headers = { document: payload.document };
    const body = {
      key: payload.key,
      name: payload.name,
      description: payload.description,
      value: payload.value,
    };

    const providerResponse = await axios.post(url, body, { headers });
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
  }

  @Post('decode')
  async Decode(
    @Body(new JoiValidationPipe(qrCodeDecodeSchema))
    payload: QrCodeDecodeDto,
    @Res() res: Response,
  ) {
    const decodeQueryUrl = this.configService.get('TRANSACTION_QRCODE_URL');
    const url = `${decodeQueryUrl}/v1/qr-codes/decode`;
    const headers = { document: payload.document };
    const body = {
      qrCodeBase64: payload.base64,
      qrCodeImageText: payload.imageText,
      qrCodeEMV: payload.emv,
    };
    const providerResponse = await axios.post(url, body, { headers });
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    if (attributes.withdrawal?.withdraw || attributes.withdrawal?.change)
      throw new BadRequestException({
        status: 400,
        data: {
          errors: [
            { errorCode: 999 },
          ],
        },
      });

    return res.status(statusCode).json(attributes);
  }
}
