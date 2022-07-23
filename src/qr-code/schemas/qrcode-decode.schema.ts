import * as Joi from '@hapi/joi';

export const qrCodeDecodeSchema = Joi.object({
  document: Joi.string().required(),
  emv: Joi.any(),
  base64: Joi.any(),
  imageText: Joi.any(),
});
