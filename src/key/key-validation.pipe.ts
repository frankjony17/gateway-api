import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { KeyFactory } from './key-factory';

@Injectable()
export class KeyValidationPipe implements PipeTransform {
  transform(value: any) {
    const key = KeyFactory.create(value);

    if (key === null) {
      throw new BadRequestException();
    }

    return key;
  }
}
