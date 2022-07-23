import { ReasonsEnum } from '../../access-key/enums/reasons.enum';

export class ConfirmClaimDto {
  document: string;
  reason: ReasonsEnum;
}
