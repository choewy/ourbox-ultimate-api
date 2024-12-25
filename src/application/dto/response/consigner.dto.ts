import { ApiResponseProperty } from '@nestjs/swagger';

import { Consigner } from '@/application/domain/entity/consigner.entity';

export class ConsignerDTO {
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

  constructor(consigner: Consigner) {
    this.id = consigner.id;
    this.name = consigner.name;
    this.zipCode = consigner.zipCode;
    this.address = consigner.address;
    this.detailAddress = consigner.detailAddress;
    this.createdAt = consigner.createdAt;
    this.updatedAt = consigner.updatedAt;
  }
}
