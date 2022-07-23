import * as Joi from '@hapi/joi';

export const paymentQrCodeSchema = Joi.object({
  clientid: Joi.number().required(),
  document: Joi.string().required(),
  qrcodeemv: Joi.string().required(),
  value: Joi.number().required(),
  commentary: Joi.string().allow('', null),
  moneyback: Joi.number(),
  purpose: Joi.string().allow('IPAY', 'OTHR', 'GSCB', '', null),
});
