import { Module } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { ConsignerModule } from './module/consigner/consigner.module';
import { DeliveryCompanyModule } from './module/delivery-company/delivery-company.module';
import { DeliveryCompanySettingModule } from './module/delivery-company-setting/delivery-company-setting.module';
import { FulfillmentModule } from './module/fulfillment/fulfillment.module';
import { PartnerModule } from './module/partner/partner.module';
import { ProductModule } from './module/product/product.module';
import { PurchaserModule } from './module/purchaser/purchaser.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PartnerModule,
    PurchaserModule,
    ConsignerModule,
    ProductModule,
    FulfillmentModule,
    DeliveryCompanyModule,
    DeliveryCompanySettingModule,
  ],
})
export class ApplicationModule {}
