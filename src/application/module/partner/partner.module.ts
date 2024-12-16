import { Module } from '@nestjs/common';

import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

import { PartnerRepository } from '@/application/domain/repository/partner.repository';

@Module({
  controllers: [PartnerController],
  providers: [PartnerRepository, PartnerService],
})
export class PartnerModule {}
