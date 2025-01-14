import { ApiResponseProperty } from '@nestjs/swagger';

import { FulfillmentCenterDTO } from './fulfillment-center.dto';
import { FulfillmentDTO } from './fulfillment.dto';
import { PartnerChannelDTO } from './partner-channel.dto';
import { PartnerDTO } from './partner.dto';

import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';

export class UserDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String, enum: UserType })
  type: UserType;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, format: 'email' })
  email: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  @ApiResponseProperty({ type: () => PartnerDTO })
  partner: PartnerDTO;

  @ApiResponseProperty({ type: () => PartnerChannelDTO })
  partnerChannel: PartnerChannelDTO;

  @ApiResponseProperty({ type: () => FulfillmentDTO })
  fulfillment: FulfillmentDTO;

  @ApiResponseProperty({ type: () => FulfillmentCenterDTO })
  fulfillmentCenter: FulfillmentCenterDTO;

  constructor(user: User) {
    this.id = user.id;
    this.type = user.type;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.partner = user.partner ? new PartnerDTO(user.partner) : null;
    this.partnerChannel = user.partnerChannel ? new PartnerChannelDTO(user.partnerChannel) : null;
    this.fulfillment = user.fulfillment ? new FulfillmentDTO(user.fulfillment) : null;
    this.fulfillmentCenter = user.fulfillmentCenter ? new FulfillmentCenterDTO(user.fulfillmentCenter) : null;
  }
}
