export class ProfileLimitQueryDto {
  constructor(limitType, maxLimit, currentLimit) {
    this.maxLimit = maxLimit;
    this.limitType = limitType;
    this.currentLimit = currentLimit;
  }

  limitType: string;
  maxLimit: number;
  currentLimit: number;
}
