import { Module } from '@nestjs/common';

import { PurchaserController } from './purchaser.controller';
import { PurchaserService } from './purchaser.service';

import { PurchaserRepository } from '@/application/domain/repository/purchaser.repository';

@Module({
  controllers: [PurchaserController],
  providers: [PurchaserRepository, PurchaserService],
})
export class PurchaserModule {}
