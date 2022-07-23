import { AbstractKeyType } from './abstract-key-type';
import { KeyTypesEnum } from '../enums/key-types.enum';

export class CnpjKeyType extends AbstractKeyType {
  name = KeyTypesEnum.CNPJ;

  validate() {
    return /^[0-9]{14}$/.test(this.value);
  }
}
