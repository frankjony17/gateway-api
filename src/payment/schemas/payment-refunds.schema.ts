import * as Joi from '@hapi/joi';

export const paymentRefundSchema = Joi.object({
  document: Joi.string().required(),
  endToEndId: Joi.string().required(),
  operationValue: Joi.number().required(),
  commentary: Joi.string().allow('', null),
});
