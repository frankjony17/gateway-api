import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { ErrorHandler } from '../common/errors.handler';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const timestamp = new Date().toISOString();
    const path = request.url ?? 'unknown';
    const customError = ErrorHandler.getHandledError(request?.body?.errors);
    const responseBody = { ...customError, status: statusCode };
    response.status(statusCode).json({
      statusCode,
      responseBody,
      timestamp,
      path,
    });
  }
}

@Catch()
export class AxiosExceptionsFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    try {
      Logger.error(JSON.stringify(exception));

      const statusCode = exception?.response?.status
        ? exception.response.status
        : HttpStatus.INTERNAL_SERVER_ERROR;

      const message = exception?.response?.data
        ? exception.response.data
        : 'Unknown Axios error';

      const customError = {
        ...ErrorHandler.getHandledError(exception?.response?.data?.errors),
        status: statusCode
      };

      const errorResponseBody = ErrorHandler.createArrayErrors(customError);

      response
        .status(statusCode)
        .json(errorResponseBody);

    } catch (err) {
      const errorResponseBody = ErrorHandler.createErrorMessageFromCode(1, HttpStatus.INTERNAL_SERVER_ERROR);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(errorResponseBody);
    }
  }
}
