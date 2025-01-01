import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { ProductHistoryRepository } from '@/application/domain/repository/product-history.repository';
import { ProductRepository } from '@/application/domain/repository/product.repository';
import { PurchaserRepository } from '@/application/domain/repository/purchaser.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductRepository, ProductHistoryRepository, PartnerChannelRepository, PurchaserRepository, ProductService],
})
export class ProductModule {}
