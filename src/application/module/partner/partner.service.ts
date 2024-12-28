import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { GetPartnerChannelsParamDTO } from '@/application/dto/request/get-partner-channels-param.dto';
import { GetPartnersParamDTO } from '@/application/dto/request/get-partners-param.dto';
import { UpdatePartnerChannelDTO } from '@/application/dto/request/update-partner-channel.dto';
import { UpdatePartnerDTO } from '@/application/dto/request/update-partner.dto';
import { PartnerChannelsDTO } from '@/application/dto/response/partner-channels.dto';
import { PartnersDTO } from '@/application/dto/response/partners.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { NotFoundPartnerChannelException, NotFoundPartnerException } from '@/constant/exceptions';
import { ObjectUtil } from '@/constant/util/object.util';

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

  async updatePartner(id: string, body: UpdatePartnerDTO) {
    const partner = await this.partnerRepository.findOneById(id);

    if (!partner) {
      throw new NotFoundPartnerException(id);
    }

    await this.partnerRepository.update(id, new ObjectUtil(partner, body).getValues());
  }

  async deletePartner(id: string) {
    if (!(await this.partnerRepository.hasById(id))) {
      throw new NotFoundPartnerException(id);
    }

    await this.partnerRepository.deleteOneById(id);
  }

  async getPartnerChannels(param: GetPartnerChannelsParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.partnerChannelRepository.findManyAndCount(param.skip, param.take, requestUser.getPartnerId(param.partnerId));

    return new PartnerChannelsDTO(param, rowsAndCount);
  }

  async createPartnerChannel(body: CreatePartnerChannelDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.partnerChannelRepository.insert({
      partnerId: requestUser.getPartnerId(body.partnerId),
      name: body.name,
    });
  }

  async updatePartnerChannel(id: string, body: UpdatePartnerChannelDTO) {
    const partnerChannel = await this.partnerChannelRepository.findOneById(id);

    if (!partnerChannel) {
      throw new NotFoundPartnerChannelException(id);
    }

    await this.partnerChannelRepository.update(id, new ObjectUtil(partnerChannel, body).getValues());
  }

  async deletePartnerChannel(id: string) {
    if (!(await this.partnerChannelRepository.hasById(id))) {
      throw new NotFoundPartnerChannelException(id);
    }

    await this.partnerChannelRepository.deleteOneById(id);
  }
}
