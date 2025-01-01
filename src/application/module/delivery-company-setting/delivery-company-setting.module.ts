import { Module } from '@nestjs/common';

import { DeliveryCompanySettingController } from './delivery-company-setting.controller';
import { DeliveryCompanySettingService } from './delivery-company-setting.service';

import { DeliveryCompanySettingRepository } from '@/application/domain/repository/delivery-company-setting.repository';
import { DeliveryCompanyRepository } from '@/application/domain/repository/delivery-company.repository';

@Module({
  controllers: [DeliveryCompanySettingController],
  providers: [DeliveryCompanyRepository, DeliveryCompanySettingRepository, DeliveryCompanySettingService],
})
export class DeliveryCompanySettingModule {}
