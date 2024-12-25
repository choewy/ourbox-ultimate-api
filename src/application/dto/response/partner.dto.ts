import { ApiResponseProperty } from '@nestjs/swagger';

import { Partner } from '@/application/domain/entity/partner.entity';

export class PartnerDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(partner: Partner) {
    this.id = partner.id;
    this.name = partner.name;
    this.createdAt = partner.createdAt;
    this.updatedAt = partner.updatedAt;
  }
}
