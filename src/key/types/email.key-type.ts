import { AbstractKeyType } from './abstract-key-type';
import { KeyTypesEnum } from '../enums/key-types.enum';

export class EmailKeyType extends AbstractKeyType {
  name = KeyTypesEnum.EMAIL;

  validate() {
    // BACEN requirement
    if (this.value.length > 77) {
      return false;
    }

    // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      this.value,
    );
  }
}
