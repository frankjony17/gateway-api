import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: transformedValue } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return transformedValue;
  }
}
