import { AbstractKeyType } from './abstract-key-type';
import { KeyTypesEnum } from '../enums/key-types.enum';

export class CpfKeyType extends AbstractKeyType {
  name = KeyTypesEnum.CPF;

  validate() {
    return /^[0-9]{11}$/.test(this.value);
  }
}
