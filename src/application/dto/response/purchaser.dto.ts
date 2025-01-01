import { ApiResponseProperty } from '@nestjs/swagger';

import { PartnerDTO } from './partner.dto';

import { Purchaser } from '@/application/domain/entity/purchaser.entity';

export class PurchaserDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  zipCode: string;

  @ApiResponseProperty({ type: String })
  address: string;

  @ApiResponseProperty({ type: String })
  detailAddress: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: () => PartnerDTO })
  partner?: PartnerDTO;

  constructor(purchaser: Purchaser) {
    this.id = purchaser.id;
    this.name = purchaser.name;
    this.zipCode = purchaser.zipCode;
    this.address = purchaser.address;
    this.detailAddress = purchaser.detailAddress;
    this.createdAt = purchaser.createdAt;
    this.updatedAt = purchaser.updatedAt;

    if (purchaser.partner) {
      this.partner = new PartnerDTO(purchaser.partner);
    }
  }
}
