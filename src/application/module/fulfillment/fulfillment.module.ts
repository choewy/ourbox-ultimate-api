import { Module } from '@nestjs/common';

import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';

import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';

@Module({
  controllers: [FulfillmentController],
  providers: [FulfillmentRepository, FulfillmentCenterRepository, FulfillmentService],
})
export class FulfillmentModule {}
