import { ErrorsMessage } from './errors.message';
import { HttpStatus } from '@nestjs/common';

export class ErrorHandler {
    static createDefaultErrorMessage() {
        return this.createArrayErrors({ ...ErrorsMessage[0], status: HttpStatus.INTERNAL_SERVER_ERROR })
    }

    static createErrorMessageFromCode(erroCode, httpStatusCode) {
        return this.createArrayErrors({ ...this.getErrorMessage(erroCode), status: httpStatusCode })
    }

    static getHandledError(errors: any) {
        if (!errors) {
            return ErrorsMessage[0];
        }

        const errorCode = this.getErrorCode(errors);

        return this.getErrorMessage(errorCode);
    }

    static getErrorCode(errors: any) {
        if (errors.length <= 0) {
            return null;
        }

        return errors[0].errorCode;
    }

    static createArrayErrors(object: any): any {
        return {
            errors: [
                object
            ]
        }
    }

    static getErrorMessage(errorCode: any) {
        var _errorCode = Number(errorCode ?? 1);

        const found = ErrorsMessage.find(x => x.errorCode === _errorCode);

        return found ?? ErrorsMessage[0];
    }
}