import { Module } from '@nestjs/common';

import { ConsignerController } from './consigner.controller';
import { ConsignerService } from './consigner.service';

import { ConsignerHistoryRepository } from '@/application/domain/repository/consigner-history.repository';
import { ConsignerRepository } from '@/application/domain/repository/consigner.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';

@Module({
  controllers: [ConsignerController],
  providers: [PartnerRepository, ConsignerRepository, ConsignerHistoryRepository, ConsignerService],
})
export class ConsignerModule {}
