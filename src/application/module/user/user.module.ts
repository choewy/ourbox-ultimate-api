import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserTypeGuard } from './user.guard';
import { UserService } from './user.service';

import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { UserRepository } from '@/application/domain/repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, PartnerRepository, PartnerChannelRepository, FulfillmentRepository, FulfillmentCenterRepository, UserService, UserTypeGuard],
})
export class UserModule {}
