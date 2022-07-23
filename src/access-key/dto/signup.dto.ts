import { AbstractKeyType } from '../../key/types/abstract-key-type';
import { KeyTypesEnum } from '../../key/enums/key-types.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ type: String })
  key: AbstractKeyType;
  keyType: KeyTypesEnum;
  document: string;
}
