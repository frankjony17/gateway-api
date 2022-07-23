import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Res,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { KeyValidationPipe } from '../../key/key-validation.pipe';
import { AbstractKeyType } from '../../key/types/abstract-key-type';
import { JoiValidationPipe } from '../../joi-validation.pipe';
import { keyRecordSchema } from '../schemas/key-record.schema';
import { keyValidationSchema } from '../schemas/key-validation.schema';
import { signupSchema } from '../schemas/signup.schema';
import { resendCodeSchema } from '../schemas/resend-code.schema';
import { KeyValidationDto } from '../dto/key-validation.dto';
import { KeyRecordDto } from '../dto/key-record.dto';
import { SignupDto } from '../dto/signup.dto';
import { ResendCodeDto } from '../dto/resend-code.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { ErrorHandler } from '../../common/errors.handler';

@ApiTags('AccessKey')
@Controller('v1/access-key')
export class AccessKeyV1Controller {
  constructor(private configService: ConfigService) { }

  @Get('list/:document')
  @ApiQuery({ name: 'showAll', required: false })
  async list(
    @Param('document') document: string,
    @Query('showAll') showAll: boolean,
    @Res() res: Response,
  ) {
    const params = { showAll };
    const accessKeyQueryUrl = this.configService.get('ACCESS_KEY_QUERY_URL');
    const url = `${accessKeyQueryUrl}/v1/access-key/list/${document}`;

    const providerResponse = await axios.get(url, { params });
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    if (!attributes.accessKeys) attributes.accessKeys = [];

    return res.status(statusCode).json(attributes);
  }

  @Get(':key')
  @ApiParam({ name: 'key', required: true, type: String })
  async check(
    @Param('key', KeyValidationPipe) key: AbstractKeyType,
    @Headers('document') document: string,
    @Res() res: Response,
  ) {
    const config = this.configService;
    const accessKeyCommandUrl = config.get('ACCESS_KEY_COMMAND_URL');
    const path = `v1/access-key/${document}/${key.toString()}`;
    const url = `${accessKeyCommandUrl}/${path}`;

    const headers = { document };

    const providerResponse = await axios.get(url, { headers })
      .then(function (providerResponse) {
        const providerResponseBody = providerResponse.data;
        const attributes = providerResponseBody.data.attributes ?? {};
        const statusCode = providerResponse.status ?? HttpStatus.OK;
        return res.status(statusCode).json(attributes);
      })
      .catch(function (error) {
        if (error.response?.status === 404) {
          return res.status(404)
            .json(ErrorHandler.createErrorMessageFromCode(5, 404));
        }
        else {
          throw error;
        }
      });
  }

  @Post('signup')
  async signup(
    @Body(new JoiValidationPipe(signupSchema)) payload: SignupDto,
    @Res() res: Response,
  ) {
    const config = this.configService;
    const accessKeyCommandUrl = config.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommandUrl}/v1/access-key/owner-confirm`;

    const headers = { document: payload.document };

    const postBody = {
      key: payload.key.toString(),
      keyType: payload.keyType,
    };

    const providerResponse = await axios.post(url, postBody, { headers });
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
  }

  @Post('resend-code')
  async resendCode(
    @Body(new JoiValidationPipe(resendCodeSchema)) payload: ResendCodeDto,
    @Res() res: Response,
  ) {
    const config = this.configService;
    const authenticationUrl = config.get('AUTHENTICATION_URL');
    const url = `${authenticationUrl}/v1/token/twofactor/generate`;

    const headers = { 'Content-Type': 'application/vnd.api+json' };

    const postBody = {
      key: payload.key.toString(),
      keyType: payload.keyType,
      document: payload.document,
    };

    const providerResponse = await axios.post(url, postBody, { headers });
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
  }

  @Post('validate')
  async validate(
    @Body(new JoiValidationPipe(keyValidationSchema)) payload: KeyValidationDto,
    @Res() res: Response,
  ) {
    const config = this.configService;
    const accessKeyCommandUrl = config.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommandUrl}/v1/access-key/owner-confirm/check`;

    const headers = { document: payload.document };

    const postBody = {
      key: payload.key.toString(),
      keyType: payload.keyType,
      token: payload.token,
    };

    const providerResponse = await axios.post(url, postBody, { headers });
    const providerResponseBody = providerResponse.data;
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
  }

  @Post()
  async register(
    @Body(new JoiValidationPipe(keyRecordSchema)) payload: KeyRecordDto,
    @Res() res: Response,
  ) {
    const accessKeyCommandUrl = this.configService.get(
      'ACCESS_KEY_COMMAND_URL',
    );
    const url = `${accessKeyCommandUrl}/v1/access-key`;

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
    const attributes = providerResponseBody.data.attributes ?? {};
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(attributes);
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
    const url = `${accessKeyCommandUrl}/v1/access-key/${key.toString()}`;

    const headers = { document };

    const providerResponse = await axios.delete(url, { headers });
    const statusCode = providerResponse.status ?? HttpStatus.NO_CONTENT;

    return res.status(statusCode).send();
  }
}
