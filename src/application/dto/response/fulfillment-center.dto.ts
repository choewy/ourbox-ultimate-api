import { ApiResponseProperty } from '@nestjs/swagger';

import { FulfillmentDTO } from './fulfillment.dto';

import { FulfillmentCenter } from '@/application/domain/entity/fulfillment-center.entity';

export class FulfillmentCenterDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: () => FulfillmentDTO })
  fulfillment: FulfillmentDTO;

  constructor(fulfillmentCenter: FulfillmentCenter) {
    this.id = fulfillmentCenter.id;
    this.name = fulfillmentCenter.name;
    this.createdAt = fulfillmentCenter.createdAt;
    this.updatedAt = fulfillmentCenter.updatedAt;
    this.fulfillment = fulfillmentCenter.fulfillment ? new FulfillmentDTO(fulfillmentCenter.fulfillment) : null;
  }
}
