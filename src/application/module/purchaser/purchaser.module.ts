import { Module } from '@nestjs/common';

import { PurchaserController } from './purchaser.controller';
import { PurchaserService } from './purchaser.service';

import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { PurchaserHistoryRepository } from '@/application/domain/repository/purchaser-history.repository';
import { PurchaserRepository } from '@/application/domain/repository/purchaser.repository';

@Module({
  controllers: [PurchaserController],
  providers: [PartnerRepository, PurchaserRepository, PurchaserHistoryRepository, PurchaserService],
})
export class PurchaserModule {}
