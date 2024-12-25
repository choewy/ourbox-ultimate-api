import { Module } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { ConsignerModule } from './module/consigner/consigner.module';
import { FulfillmentModule } from './module/fulfillment/fulfillment.module';
import { PartnerModule } from './module/partner/partner.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [AuthModule, UserModule, PartnerModule, ConsignerModule, FulfillmentModule],
})
export class ApplicationModule {}
