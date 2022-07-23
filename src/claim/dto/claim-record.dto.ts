import { KeyTypesEnum } from 'src/key/enums/key-types.enum';

export abstract class ClaimRecordDto {
  document: string;
  key: string;
  keyType: KeyTypesEnum;
}
