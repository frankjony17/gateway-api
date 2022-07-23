import * as Joi from '@hapi/joi';

export const cancelClaimValidationSchema = Joi.object({
  document: Joi.string().required(),
});
