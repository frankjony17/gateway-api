import * as Joi from '@hapi/joi';

export const qrCodeCreateValidationSchema = Joi.object({
  document: Joi.string().required(),
  key: Joi.string().required(),
  name: Joi.string()
    .allow('')
    .optional(),
  description: Joi.string()
    .allow('')
    .optional(),
  value: Joi.number()
    .required()
    .min(0),
});
