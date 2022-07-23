import * as Joi from '@hapi/joi';

export const completeClaimValidationSchema = Joi.object({
  document: Joi.string().required(),
});
