import { Module } from '@nestjs/common';

import { ConsignerController } from './consigner.controller';
import { ConsignerService } from './consigner.service';

import { ConsignerRepository } from '@/application/domain/repository/consigner.repository';

@Module({
  controllers: [ConsignerController],
  providers: [ConsignerRepository, ConsignerService],
})
export class ConsignerModule {}
