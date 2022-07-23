import { AbstractKeyType } from '../../key/types/abstract-key-type';
import { KeyTypesEnum } from '../../key/enums/key-types.enum';
import { ApiProperty } from '@nestjs/swagger';

export class KeyValidationDto {
  @ApiProperty({ type: String })
  key: AbstractKeyType;
  keyType: KeyTypesEnum;
  token: string;
  document: string;
}
