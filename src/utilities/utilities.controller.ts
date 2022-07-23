import { Controller, Param, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';

@ApiTags('Utilities')
@Controller('v1/utilities')
export class UtilitiesController {
  constructor(private configService: ConfigService) {}

  @Get('is-bacen-open')
  async isBacenOpen(@Res() res: Response) {
    const config = this.configService;
    const utilitiesUrl = config.get('UTILITIES_URL');
    const path = `v1/utilities/is-bacen-open`;
    const url = `${utilitiesUrl}/${path}`;

    const response = await axios.get(url);
    const responseBody = response.data;
    const statusCode = response.status ?? HttpStatus.OK;
    return res.status(statusCode).json(responseBody);
  }

  @Get('person-info/:document')
  async personInfo(@Param('document') document: string, @Res() res: Response) {
    const config = this.configService;
    const utilitiesUrl = config.get('UTILITIES_URL');
    const path = `v1/person-info/${document}`;
    const url = `${utilitiesUrl}/${path}`;

    const response = await axios.get(url);
    const responseBody = response.data;
    const attributes = responseBody.data.attributes ?? {};
    const statusCode = response.status ?? HttpStatus.OK;
    return res.status(statusCode).json(attributes);
  }

  @Get('ispb/:ispb')
  async getInstitution(@Param('ispb') ispb: string, @Res() res: Response) {
    const config = this.configService;
    const utilitiesUrl = config.get('UTILITIES_URL');
    const path = `v1/ispb/${ispb}`;
    const url = `${utilitiesUrl}/${path}`;

    const response = await axios.get(url);
    const responseBody = response.data;
    const attributes = responseBody.data.attributes ?? {};
    const statusCode = response.status ?? HttpStatus.OK;
    return res.status(statusCode).json(attributes);
  }
}
