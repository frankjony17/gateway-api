import * as Joi from '@hapi/joi';

export const profileLimitSchema = Joi.object({
  checkingAccountUuid: Joi.string().required(),
  createdBy: Joi.string().required(),
  document: Joi.string().required(),
  currentLimit: Joi.number().required(),
  limitType: Joi.number()
    .required()
    .greater(0),
});
