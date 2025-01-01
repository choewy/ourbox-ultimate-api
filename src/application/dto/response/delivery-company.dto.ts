import { ApiResponseProperty } from '@nestjs/swagger';

import { DeliveryCompanyCode, DeliveryCompanyStatus } from '@/application/domain/constant/enums';
import { DeliveryCompany } from '@/application/domain/entity/delivery-company.entity';

export class DeliveryCompanyDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String, enum: DeliveryCompanyCode })
  code: DeliveryCompanyCode;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, enum: DeliveryCompanyStatus })
  status: DeliveryCompanyStatus;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(deliveryCompany: DeliveryCompany) {
    this.id = deliveryCompany.id;
    this.code = deliveryCompany.code;
    this.name = deliveryCompany.name;
    this.createdAt = deliveryCompany.createdAt;
    this.updatedAt = deliveryCompany.updatedAt;
  }
}
