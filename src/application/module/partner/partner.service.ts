import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class PartnerService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
  ) {}

  async createPartner(createPartnerDTO: CreatePartnerDTO) {
    await this.partnerRepository.insert({
      name: createPartnerDTO.name,
    });
  }

  async createPartnerChannel(createPartnerChannelDTO: CreatePartnerChannelDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.partnerChannelRepository.insert({
      partnerId: requestUser.partnerId,
      name: createPartnerChannelDTO.name,
    });
  }
}
