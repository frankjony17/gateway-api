import * as Joi from '@hapi/joi';

export const paymentBankAccountSchema = Joi.object({
  document: Joi.string().required(),
  account: Joi.object({
    ispb: Joi.string(),
    bankcode: Joi.string(),
    agency: Joi.string().required(),
    account: Joi.string().required(),
    type: Joi.string().allow('', null),
  })
    .or('ispb', 'bankcode')
    .required(),
  creditor: Joi.object({
    document: Joi.string().required(),
    name: Joi.string().required(),
  }).required(),
  value: Joi.number()
    .positive()
    .required(),
  commentary: Joi.string().allow('', null)
});
