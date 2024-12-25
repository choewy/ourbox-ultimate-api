import { ApiResponseProperty } from '@nestjs/swagger';

import { PartnerDTO } from './partner.dto';

import { PartnerChannel } from '@/application/domain/entity/partner-channel.entity';

export class PartnerChannelDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: () => PartnerDTO })
  partner: PartnerDTO;

  constructor(partnerChannel: PartnerChannel) {
    this.id = partnerChannel.id;
    this.name = partnerChannel.name;
    this.createdAt = partnerChannel.createdAt;
    this.updatedAt = partnerChannel.updatedAt;
    this.partner = partnerChannel.partner ? new PartnerDTO(partnerChannel.partner) : null;
  }
}
