import { Module } from '@nestjs/common';
import { PortabilityV1Controller as PortabilityV1Controller } from './portability/v1/portabilityV1.controller';
import { PortabilityV2Controller as PortabilityV2Controller } from './portability/v2/portabilityV2.controller';
import { OwnershipV1Controller as OwnershipV1Controller } from './ownership/v1/ownershipV1.controller';
import { OwnershipV2Controller as OwnershipV2Controller } from './ownership/v2/ownershipV2.controller';
import { ClaimV1Controller as ClaimV1Controller} from './route/v1/claim-v1.controller';
import { ClaimV2Controller as ClaimV2Controller } from './route/v2/claim-v2.controller';

@Module({
    controllers: [PortabilityV1Controller, PortabilityV2Controller, OwnershipV1Controller, OwnershipV2Controller, ClaimV1Controller, ClaimV2Controller],
})
export class ClaimModule {}
