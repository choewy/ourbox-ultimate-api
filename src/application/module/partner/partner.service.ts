import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { GetPartnerChannelsParamDTO } from '@/application/dto/request/get-partner-channels-param.dto';
import { GetPartnersParamDTO } from '@/application/dto/request/get-partners-param.dto';
import { PartnerChannelsDTO } from '@/application/dto/response/partner-channels.dto';
import { PartnersDTO } from '@/application/dto/response/partners.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class PartnerService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
  ) {}

  async getPartners(param: GetPartnersParamDTO) {
    const rowsAndCount = await this.partnerRepository.findManyAndCount(param.skip, param.take);

    return new PartnersDTO(param, rowsAndCount);
  }

  async createPartner(body: CreatePartnerDTO) {
    await this.partnerRepository.insert({ name: body.name });
  }

  async getPartnerChannels(param: GetPartnerChannelsParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.partnerChannelRepository.findManyAndCount(requestUser.getPartnerId(param.partnerId), param.skip, param.take);

    return new PartnerChannelsDTO(param, rowsAndCount);
  }

  async createPartnerChannel(body: CreatePartnerChannelDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.partnerChannelRepository.insert({
      partnerId: requestUser.getPartnerId(body.partnerId),
      name: body.name,
    });
  }
}
