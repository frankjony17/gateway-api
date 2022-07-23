import * as Joi from '@hapi/joi';

export const paymentAccessKeySchema = Joi.object({
  documentDebtor: Joi.string().required(),
  documentCreditor: Joi.string().required(),
  keyId: Joi.string().required(),
  type: Joi.string().required(),
  value: Joi.number()
    .required()
    .greater(0),
  commentary: Joi.string().allow('', null)
});
