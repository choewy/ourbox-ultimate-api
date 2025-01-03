import { Module } from '@nestjs/common';

import { PartnerChannelController } from './partner-channel.controller';
import { PartnerChannelService } from './partner-channel.service';

import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';

@Module({
  controllers: [PartnerChannelController],
  providers: [PartnerRepository, PartnerChannelRepository, PartnerChannelService],
})
export class PartnerChannelModule {}
