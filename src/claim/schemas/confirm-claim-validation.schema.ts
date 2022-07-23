import * as Joi from '@hapi/joi';

export const confirmClaimValidationSchema = Joi.object({
  document: Joi.string().required(),
  reason: Joi.string().required(),
});
