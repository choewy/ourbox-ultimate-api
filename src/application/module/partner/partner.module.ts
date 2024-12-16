import { Module } from '@nestjs/common';

import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';

@Module({
  controllers: [PartnerController],
  providers: [PartnerRepository, PartnerChannelRepository, PartnerService],
})
export class PartnerModule {}
