import { Module } from '@nestjs/common';

import { FulfillmentCenterController } from './fulfillment-center.controller';
import { FulfillmentCenterService } from './fulfillment-center.service';

import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';

@Module({
  controllers: [FulfillmentCenterController],
  providers: [FulfillmentRepository, FulfillmentCenterRepository, FulfillmentCenterService],
})
export class FulfillmentCenterModule {}
