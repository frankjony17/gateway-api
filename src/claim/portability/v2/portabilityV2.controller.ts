import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { JoiValidationPipe } from '../../../joi-validation.pipe';
import { claimRecordSchema } from '../../schemas/claim-record.schema';
import { ClaimTypesEnum } from '../../enums/claim-types.enum';
import { ClaimRecordDto } from '../../dto/claim-record.dto';

@ApiTags('Claim')
@Controller('v2/portability')
export class PortabilityV2Controller {
  constructor(private configService: ConfigService) {}

  @Post('start')
  async start(
    @Body(new JoiValidationPipe(claimRecordSchema))
    payload: ClaimRecordDto,
    @Res() res: Response,
  ) {
    const config = this.configService;
    const accessKeyCommandUrl = config.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommandUrl}/v2/claims`;
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      document: payload.document,
    };

    const postBody = {
      key: payload.key.toString(),
      keyType: payload.keyType,
      type: ClaimTypesEnum.PORTABILITY,
    };

    const providerResponse = await axios.post(url, postBody, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);    
  }
}
