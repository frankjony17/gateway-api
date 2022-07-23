import * as Joi from '@hapi/joi';

export const schedulerQrCodeSchema = Joi.object({
    document: Joi.string().required(),
    qrCodeEmv: Joi.string().required(),
    scheduleDate: Joi.string().required(),
    comment: Joi.string().allow(''),
});