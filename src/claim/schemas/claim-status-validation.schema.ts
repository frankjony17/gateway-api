import * as Joi from '@hapi/joi';

export const claimStatusValidationSchema = Joi.object({
  document: Joi.string().required(),
});
