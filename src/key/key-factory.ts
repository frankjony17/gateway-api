import { AbstractKeyType } from './types/abstract-key-type';
import * as allKeyTypes from './types';

export class KeyFactory {
  static create(keyValue: string): AbstractKeyType | null {
    const keyTypes = Object.values(allKeyTypes);
    const amountOfTypes = keyTypes.length;

    for (let i = 0; i < amountOfTypes; i++) {
      try {
        const KeyTypeClass = keyTypes[i];

        if (!(Object.getPrototypeOf(KeyTypeClass) === AbstractKeyType)) {
          continue;
        }

        const keyTypeInstance = new KeyTypeClass(keyValue);
        return keyTypeInstance;
      } catch {}
    }

    return null;
  }
}
