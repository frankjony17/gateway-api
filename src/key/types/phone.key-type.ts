import { AbstractKeyType } from './abstract-key-type';
import { KeyTypesEnum } from '../enums/key-types.enum';

export class PhoneKeyType extends AbstractKeyType {
  name = KeyTypesEnum.PHONE;

  validate() {
    return /^\+[1-9][0-9]\d{1,14}$/.test(this.value);
  }
}
