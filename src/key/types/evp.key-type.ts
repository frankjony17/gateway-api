import { AbstractKeyType } from './abstract-key-type';
import { KeyTypesEnum } from '../enums/key-types.enum';

export class EvpKeyType extends AbstractKeyType {
  name = KeyTypesEnum.EVP;

  validate() {
    return (
      this.value === '' ||
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        this.value,
      )
    );
  }
}
