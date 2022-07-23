import { AbstractKeyType } from '../../key/types/abstract-key-type';
import { KeyTypesEnum } from '../../key/enums/key-types.enum';
import { ReasonsEnum } from '../enums/reasons.enum';
import { ApiProperty } from '@nestjs/swagger';

export class KeyRecordDto {
  @ApiProperty({ type: String })
  key: AbstractKeyType;
  keyType: KeyTypesEnum;
  reason: ReasonsEnum;
  document: string;
}
