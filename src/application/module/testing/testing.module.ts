import { Module } from '@nestjs/common';

import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';

import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { UserRepository } from '@/application/domain/repository/user.repository';

@Module({
  controllers: [TestingController],
  providers: [TestingService, UserRepository, PartnerRepository, PartnerChannelRepository, FulfillmentRepository, FulfillmentCenterRepository],
})
export class TestingModule {}
