import { ApiResponseProperty } from '@nestjs/swagger';

import { PartnerChannelDTO } from './partner-channel.dto';
import { ProductComponentDTO } from './product-component.dto';
import { PurchaserDTO } from './purchaser.dto';

import { ProductType, ProductUnit } from '@/application/domain/constant/enums';
import { Product } from '@/application/domain/entity/product.entity';

export class ProductDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, enum: ProductType })
  type: ProductType;

  @ApiResponseProperty({ type: String, enum: ProductUnit })
  unit: ProductUnit;

  @ApiResponseProperty({ type: Number })
  unitCount: number;

  @ApiResponseProperty({ type: [ProductComponentDTO] })
  productComponents: ProductComponentDTO[];

  @ApiResponseProperty({ type: PurchaserDTO })
  purchaser: PurchaserDTO;

  @ApiResponseProperty({ type: [PartnerChannelDTO] })
  partnerChannel: PartnerChannelDTO;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.type = product.type;
    this.unit = product.unit;
    this.unitCount = product.unitCount;

    if (Array.isArray(product.products)) {
      this.productComponents = product.products.map((productComponent) => new ProductComponentDTO(productComponent));
    }

    if (product.purchaser) {
      this.purchaser = new PurchaserDTO(product.purchaser);
    }

    if (product.partnerChannel) {
      this.partnerChannel = new PartnerChannelDTO(product.partnerChannel);
    }
  }
}
