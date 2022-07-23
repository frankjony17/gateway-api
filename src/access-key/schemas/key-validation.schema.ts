import * as Joi from '@hapi/joi';
import { KeyFactory } from '../../key/key-factory';
import { KeyTypesEnum } from '../../key/enums/key-types.enum';
import { AbstractKeyType } from '../../key/types/abstract-key-type';

const isTrustKey = (value, helper) => {
  const key = KeyFactory.create(value);

  if (key === null) {
    return helper.message('"key" is invalid');
  }

  return key;
};

const doesKeyMatch = (obj, helper) => {
  const notMatch = obj.keyType !== obj.key.name;
  if (notMatch) {
    return helper.message('"key" must match the "keyType"');
  }

  return obj;
};

const enforceKeyFactory = obj => {
  if (!(obj.key instanceof AbstractKeyType)) {
    obj.key = KeyFactory.create(obj.key);
  }

  return obj;
};

export const keyValidationSchema = Joi.object({
  key: Joi.string()
    .custom(isTrustKey)
    .allow('')
    .required(),
  keyType: Joi.string()
    .equal(...Object.values(KeyTypesEnum))
    .required(),
  token: Joi.string()
    .length(6)
    .required(),
  document: Joi.string()
    .length(14)
    .required(),
})
  .custom(enforceKeyFactory)
  .custom(doesKeyMatch);
