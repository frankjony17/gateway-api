import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { KeyValidationPipe } from '../../key/key-validation.pipe';
import { AbstractKeyType } from '../../key/types/abstract-key-type';
import { JoiValidationPipe } from '../../joi-validation.pipe';
import { keyRecordSchema } from '../schemas/key-record.schema';
import { KeyRecordDto } from '../dto/key-record.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';

@ApiTags('AccessKey')
@Controller('v2/access-key')
export class AccessKeyV2Controller {
  constructor(private configService: ConfigService) { }

  @Post()
  async register(
    @Body(new JoiValidationPipe(keyRecordSchema)) payload: KeyRecordDto,
    @Res() res: Response,
  ) {
    const accessKeyCommandUrl = this.configService.get(
      'ACCESS_KEY_COMMAND_URL',
    );
    const url = `${accessKeyCommandUrl}/v2/access-key`;

    const headers = {
      'Content-Type': 'application/vnd.api+json',
      document: payload.document,
    };

    const postBody = {
      key: payload.key.toString(),
      keyType: payload.keyType,
      reason: payload.reason,
    };

    const providerResponse = await axios.post(url, postBody, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);    
  }

  @Delete(':key')
  @ApiParam({ name: 'key', required: true, type: String })
  async remove(
    @Param('key', KeyValidationPipe) key: AbstractKeyType,
    @Headers('document') document: string,
    @Res() res: Response,
  ) {
    const config = this.configService;
    const accessKeyCommandUrl = config.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommandUrl}/v2/access-key/${key.toString()}`;

    const headers = { document };

    const providerResponse = await axios.delete(url, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);    
  }
}
