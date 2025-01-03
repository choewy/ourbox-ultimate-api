import { Module } from '@nestjs/common';

import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';

import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';

@Module({
  controllers: [FulfillmentController],
  providers: [FulfillmentRepository, FulfillmentService],
})
export class FulfillmentModule {}
