import * as Joi from '@hapi/joi';
import { KeyFactory } from '../../key/key-factory';
import { AbstractKeyType } from '../../key/types/abstract-key-type';
import { KeyTypesEnum } from '../../key/enums/key-types.enum';

const VALID_KEY_TYPES = [
  KeyTypesEnum.EMAIL,
  KeyTypesEnum.PHONE,
  KeyTypesEnum.CPF,
  KeyTypesEnum.CNPJ,
];

const enforceKeyFactory = obj => {
  if (!(obj.key instanceof AbstractKeyType)) {
    obj.key = KeyFactory.create(obj.key);
  }

  return obj;
};

const isTrustKey = (value, helper) => {
  const key = KeyFactory.create(value);

  if (key === null) {
    return helper.message('"key" is invalid');
  }

  return key;
};

export const claimRecordSchema = Joi.object({
  document: Joi.string()
    .length(14)
    .required(),
  key: Joi.string()
    .required()
    .custom(isTrustKey),
  keyType: Joi.string()
    .equal(...VALID_KEY_TYPES)
    .required(),
}).custom(enforceKeyFactory);
