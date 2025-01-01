import { ApiResponseProperty } from '@nestjs/swagger';

import { ProductComponent } from '@/application/domain/entity/product-component.entity';

export class ProductComponentDTO {
  @ApiResponseProperty({ type: String })
  productId: string;

  @ApiResponseProperty({ type: String })
  productName: string;

  @ApiResponseProperty({ type: Number })
  count: number;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(productComponent: ProductComponent) {
    const componentProduct = productComponent.componentProduct;

    if (!componentProduct) {
      return;
    }

    this.productId = componentProduct.id;
    this.productName = componentProduct.name;
    this.count = productComponent.count;
    this.createdAt = productComponent.createdAt;
    this.updatedAt = productComponent.updatedAt;
  }
}
