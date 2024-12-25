import { ApiResponseProperty } from '@nestjs/swagger';

import { Fulfillment } from '@/application/domain/entity/fulfillment.entity';

export class FulfillmentDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(fulfillment: Fulfillment) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;
    this.createdAt = fulfillment.createdAt;
    this.updatedAt = fulfillment.updatedAt;
  }
}
