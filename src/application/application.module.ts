import { Module } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { ConsignerModule } from './module/consigner/consigner.module';
import { DeliveryCompanyModule } from './module/delivery-company/delivery-company.module';
import { DeliveryCompanySettingModule } from './module/delivery-company-setting/delivery-company-setting.module';
import { FulfillmentModule } from './module/fulfillment/fulfillment.module';
import { FulfillmentCenterModule } from './module/fulfillment-center/fulfillment-center.module';
import { PartnerModule } from './module/partner/partner.module';
import { PartnerChannelModule } from './module/partner-channel/partner-channel.module';
import { ProductModule } from './module/product/product.module';
import { PurchaserModule } from './module/purchaser/purchaser.module';
import { TestingModule } from './module/testing/testing.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    TestingModule,
    AuthModule,
    UserModule,
    PartnerModule,
    PartnerChannelModule,
    PurchaserModule,
    ConsignerModule,
    ProductModule,
    FulfillmentModule,
    FulfillmentCenterModule,
    DeliveryCompanyModule,
    DeliveryCompanySettingModule,
  ],
})
export class ApplicationModule {}
