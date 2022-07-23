import {
  Param,
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { JoiValidationPipe } from '../../joi-validation.pipe';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { profileLimitSchema } from '../schemas/profile-limit.schema';
import { ProfileLimitCommandDto } from '../dto/profile-limit-command.dto';
import { ProfileLimitQueryDto } from '../dto/profile-limit-query.dto';

@ApiTags('Customer')
@Controller('v1/customer')
export class ProfileLimitsController {
  constructor(private configService: ConfigService) {}

  @Post('limits')
  async post(
    @Body(new JoiValidationPipe(profileLimitSchema))
    payload: ProfileLimitCommandDto,
    @Res() res: Response,
  ) {
    const profileLimitsCommandUrl = this.configService.get(
      'CUSTOMER_PROFILE_LIMITS_COMMAND_URL',
    );
    const url = `${profileLimitsCommandUrl}/v1/limits`;

    const postBody = {
      checkingAccountId: payload.checkingAccountUuid,
      rateLimitTypeId: payload.limitType,
      limitSelectedValor: payload.currentLimit,
      createdBy: payload.createdBy,
    };

    const providerResponse = await axios.post(url, postBody);

    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    this.DeletePersonInfoCache(payload.document);

    return res.status(statusCode).json(providerResponseBody);
  }

  @Get('limits/:checkingAccount')
  @ApiParam({ name: 'checkingAccount', required: true, type: String })
  async list(
    @Param('checkingAccount') checkingAccount: string,
    @Res() res: Response,
  ) {
    const profileLimitsQueryUrl = this.configService.get(
      'CUSTOMER_PROFILE_LIMITS_QUERY_URL',
    );
    const url = `${profileLimitsQueryUrl}/v1/limits/${checkingAccount}`;

    const providerResponse = await axios.get(url);

    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    const profileQueryDto = providerResponseBody.map(item => {
      return new ProfileLimitQueryDto(
        item.rateLimitTypeId,
        item.rateLimitMaxValor,
        item.limitSelectedValor,
      );
    });

    var response = profileQueryDto ?? providerResponseBody;

    return res.status(statusCode).json(response);
  }

  async DeletePersonInfoCache(document: string) {
    const utilitiesUrl = this.configService.get('UTILITIES_URL');

    const url = `${utilitiesUrl}/v1/person-info/${document}/cache`;

    await axios.delete(url).catch(err => {
      Logger.error(err);
    });
  }
}
