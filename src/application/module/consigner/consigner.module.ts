import { Module } from '@nestjs/common';

import { ConsignerController } from './consigner.controller';
import { ConsignerService } from './consigner.service';

import { ConsignerRepository } from '@/application/domain/repository/consigner.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';

@Module({
  controllers: [ConsignerController],
  providers: [PartnerRepository, ConsignerRepository, ConsignerService],
})
export class ConsignerModule {}
