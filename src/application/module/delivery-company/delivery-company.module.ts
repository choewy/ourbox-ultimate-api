import { Module } from '@nestjs/common';

import { DeliveryCompanyController } from './delivery-company.controller';
import { DeliveryCompanyService } from './delivery-company.service';

import { DeliveryCompanyRepository } from '@/application/domain/repository/delivery-company.repository';

@Module({
  controllers: [DeliveryCompanyController],
  providers: [DeliveryCompanyRepository, DeliveryCompanyService],
})
export class DeliveryCompanyModule {}
