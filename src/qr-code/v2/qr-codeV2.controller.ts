import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { JoiValidationPipe } from '../../joi-validation.pipe';
import { QrCodeDecodeDto, QrCodeDecodeResponseDto } from '../dto/qrcode-decode.dto';
import { qrCodeDecodeSchema } from '../schemas/qrcode-decode.schema';

@ApiTags('QRCode')
@Controller('v2/qr-code')
export class QrCodeV2Controller {
  constructor(private configService: ConfigService) {}

  @Post('decode')
  @ApiOkResponse({
    type: QrCodeDecodeResponseDto,
    description: 'Exemplo de body caso seja api saque ou troco'
  })
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
    attributes.purpose = (({ withdraw, change }) => {
      if (withdraw) return 'OTHR';
      if (change) return 'GSCB';
      return 'IPAY';
    })(attributes.withdrawal || {});

    return res.status(statusCode).json(attributes);
  }
}
