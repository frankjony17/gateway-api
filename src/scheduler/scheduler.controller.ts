import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { ConfigService } from '@nestjs/config';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import axios from 'axios';

import { SchedulerQRCodeDto } from './dto/scheduler-qrcode.dto';
import { SchedulerReceiptStatusDto } from './dto/scheduler-receipt-status.dto';
import { SchedulerReceiptStatusEnum } from './enums/scheduler.receipt-status.enum';
import { schedulerQrCodeSchema } from './schemas/scheduler-qrcode-dynamic.schema';

@ApiTags('Scheduler')
@Controller('v1/scheduler')
export class SchedulerController {
  constructor(private configService: ConfigService) {}

  @Post('account/:accountId/qr-code/dynamic')
  @ApiParam({ name: 'accountId', type: String })
  async qrCodeDynamic(
    @Body(new JoiValidationPipe(schedulerQrCodeSchema))
    payload: SchedulerQRCodeDto,
    @Res() res: Response,
  ) {
    const schedulerCommandUrl = this.configService.get<string>(
      'SCHEDULER_COMMAND_URL',
    );
    const url = `${schedulerCommandUrl}/v1/schedulers/qr-code/dynamic`;

    const postBody = {
      document: payload.document,
      qrCodeEmv: payload.qrCodeEmv,
      scheduleDate: payload.scheduleDate,
      comment: payload.comment,
    };

    const providerResponse = await axios.post(url, postBody);
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post('account/:accountId/qr-code/static')
  @ApiParam({ name: 'accountId', type: String })
  async qrCodeStatic(
    @Body(new JoiValidationPipe(schedulerQrCodeSchema))
    payload: SchedulerQRCodeDto,
    @Res() res: Response,
  ) {
    const schedulerCommandUrl = this.configService.get<string>(
      'SCHEDULER_COMMAND_URL',
    );
    const url = `${schedulerCommandUrl}/v1/schedulers/qr-code/static`;

    const postBody = {
      document: payload.document,
      qrCodeEmv: payload.qrCodeEmv,
      scheduleDate: payload.scheduleDate,
      comment: payload.comment,
    };

    const providerResponse = await axios.post(url, postBody);
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Post(':schedulerId/status/cancel')
  @ApiParam({ name: 'schedulerId', type: Number })
  async cancel(
    @Param('schedulerId') schedulerId: number,
    @Res() res: Response,
  ) {
    const schedulerCommandUrl = this.configService.get<string>(
      'SCHEDULER_COMMAND_URL',
    );
    const url = `${schedulerCommandUrl}/v1/schedulers/${schedulerId}/status/canceled`;

    const providerResponse = await axios.post(url);
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Get(':schedulerId/checking-account/:checkingAccountUuid/receipt')
  @ApiParam({ name: 'schedulerId', type: Number })
  @ApiParam({ name: 'checkingAccountUuid', type: String })
  async receipt(
    @Param('schedulerId') schedulerId: number,
    @Param('checkingAccountUuid') checkingAccountUuid: string,
    @Res() res: Response,
  ) {
    const schedulerQueryUrl = this.configService.get<string>(
      'SCHEDULER_QUERY_URL',
    );
    const url = `${schedulerQueryUrl}/v1/schedulers/${checkingAccountUuid}/receipt/${schedulerId}`;

    const providerResponse = await axios.get(url);
    const providerResponseBody = providerResponse.data;
    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }

  @Get(':schedulerId/checking-account/:checkingAccountUuid/receipt/status')
  @ApiParam({ name: 'schedulerId', type: Number })
  @ApiParam({ name: 'checkingAccountUuid', type: String })
  async status(
    @Param('schedulerId') schedulerId: number,
    @Param('checkingAccountUuid') checkingAccountUuid: string,
    @Res() res: Response,
  ) {
    const schedulerQueryUrl = this.configService.get<string>(
      'SCHEDULER_QUERY_URL',
    );
    const url = `${schedulerQueryUrl}/v1/schedulers/${checkingAccountUuid}/receipt/${schedulerId}`;

    const providerResponse = await axios.get(url);

    const statusResponse = new SchedulerReceiptStatusDto();
    statusResponse.schedulerId = schedulerId;
    switch (providerResponse.status) {
      case HttpStatus.OK:
        statusResponse.status = SchedulerReceiptStatusEnum.SUCCESS;
        break;
      case HttpStatus.NO_CONTENT:
        statusResponse.status = SchedulerReceiptStatusEnum.PENDING;
        break;
      default:
        statusResponse.status = SchedulerReceiptStatusEnum.ERROR;
        break;
    }

    return res.status(HttpStatus.OK).json(statusResponse);
  }

  @Get('checking-account/:checkingAccountUuid/future')
  @ApiParam({ name: 'checkingAccountUuid', type: String })
  async future(
    @Param('checkingAccountUuid') checkingAccountUuid: string,
    @Res() res: Response,
  ) {
    const schedulerQueryUrl = this.configService.get<string>(
      'SCHEDULER_QUERY_URL',
    );
    const url = `${schedulerQueryUrl}/v1/schedulers/${checkingAccountUuid}/future`;

    const providerResponse = await axios.get(url);
    const providerResponseBody = providerResponse.data;
    if (providerResponse.status === HttpStatus.OK) {
      providerResponseBody.data = providerResponseBody.data.map((item: any) => {
        const temp = Object.assign({}, item);
        if (
          !temp.attributes.apiScheduleComment ||
          temp.attributes.apiScheduleComment === ''
        ) {
          temp.attributes.apiScheduleComment = `api Agendado para ${temp.attributes.scheduleBeneficiary.name}`;
        }
        return temp;
      });
    }

    const statusCode = providerResponse.status ?? HttpStatus.OK;

    return res.status(statusCode).json(providerResponseBody);
  }
}
