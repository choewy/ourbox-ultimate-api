import { Module } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { ConsignerModule } from './module/consigner/consigner.module';
import { FulfillmentModule } from './module/fulfillment/fulfillment.module';
import { PartnerModule } from './module/partner/partner.module';
import { ProductModule } from './module/product/product.module';
import { PurchaserModule } from './module/purchaser/purchaser.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [AuthModule, UserModule, PartnerModule, PurchaserModule, ConsignerModule, FulfillmentModule, ProductModule],
})
export class ApplicationModule {}
