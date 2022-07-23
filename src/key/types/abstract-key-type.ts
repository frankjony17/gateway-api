import { KeyTypesEnum } from '../enums/key-types.enum';

export abstract class AbstractKeyType {
  constructor(protected readonly value: string) {
    const isInvalid = !this.validate(this.value);
    if (isInvalid) {
      throw new TypeError();
    }
  }

  abstract readonly name: KeyTypesEnum;

  abstract validate(value: string): boolean;

  toString() {
    return this.value;
  }
}
