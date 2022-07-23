import { Controller, Post, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';
import { JoiValidationPipe } from '../../../joi-validation.pipe';
import { CancelClaimDto } from './../../dto/cancel-claim.dto';
import { ConfirmClaimDto } from './../../dto/confirm-claim.dto';
import { CompleteClaimDto } from './../../dto/complete-claim.dto';
import { ClaimStatusDto } from './../../dto/claim-status.dto';
import { cancelClaimValidationSchema } from './../../schemas/cancel-claim-validation.schema';
import { confirmClaimValidationSchema } from './../../schemas/confirm-claim-validation.schema';
import { completeClaimValidationSchema } from './../../schemas/complete-claim-validation.schema';
import { claimStatusValidationSchema } from './../../schemas/claim-status-validation.schema';

@ApiTags('Claim')
@Controller('v1/claims')
export class ClaimV1Controller {
  constructor(private configService: ConfigService) {}

  @Post(':claimId/cancelled')
  async Cancel(
    @Param('claimId') claimId: string,
    @Body(new JoiValidationPipe(cancelClaimValidationSchema))
    payload: CancelClaimDto,
    @Res() res: Response,
  ) {
    const accessKeyCommand = this.configService.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommand}/v1/claims/${claimId}/cancelled`;
    const headers = { document: payload.document };

    const providerResponse = await axios.post(url, null, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post(':claimId/confirmed')
  async Confirmed(
    @Param('claimId') claimId: string,
    @Body(new JoiValidationPipe(confirmClaimValidationSchema))
    payload: ConfirmClaimDto,
    @Res() res: Response,
  ) {
    const accessKeyCommand = this.configService.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommand}/v1/claims/${claimId}/confirmed`;
    const headers = { document: payload.document };
    const body = { reason: payload.reason };

    const providerResponse = await axios.post(url, body, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post(':claimId/completed')
  async Complete(
    @Param('claimId') claimId: string,
    @Body(new JoiValidationPipe(completeClaimValidationSchema))
    payload: CompleteClaimDto,
    @Res() res: Response,
  ) {
    const accessKeyCommand = this.configService.get('ACCESS_KEY_COMMAND_URL');
    const url = `${accessKeyCommand}/v1/claims/${claimId}/completed`;
    const headers = { document: payload.document };

    const providerResponse = await axios.post(url, null, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post(':claimId')
  async Status(
    @Param('claimId') claimId: string,
    @Body(new JoiValidationPipe(claimStatusValidationSchema))
    payload: ClaimStatusDto,
    @Res() res: Response,
  ) {
    const accessKeyQuery = this.configService.get('ACCESS_KEY_QUERY_URL');
    const url = `${accessKeyQuery}/v1/claims/${claimId}`;
    const headers = { document: payload.document };

    const providerResponse = await axios.get(url, { headers });
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }
}
