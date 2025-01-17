import { Injectable } from '@nestjs/common';

import { ObjectUtil } from '../../../constant/util/object.util';

import { User } from '@/application/domain/entity/user.entity';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { GetPartnerChannelsParamDTO } from '@/application/dto/request/get-partner-channels-param.dto';
import { UpdatePartnerChannelDTO } from '@/application/dto/request/update-partner-channel.dto';
import { PartnerChannelsDTO } from '@/application/dto/response/partner-channels.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { NotFoundPartnerChannelException, NotFoundPartnerException } from '@/constant/exceptions';

@Injectable()
export class PartnerChannelService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
  ) {}

  async getPartnerChannels(param: GetPartnerChannelsParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.partnerChannelRepository.findManyAndCount(param.skip, param.take, requestUser.getPartnerId(param.partnerId));

    return new PartnerChannelsDTO(param, rowsAndCount);
  }

  async createPartnerChannel(body: CreatePartnerChannelDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const partnerId: string = requestUser.getPartnerId(body.partnerId);

    if (partnerId && !(await this.partnerRepository.hasById(body.partnerId))) {
      throw new NotFoundPartnerException(body.partnerId);
    }

    await this.partnerChannelRepository.insertOne(requestUser, {
      name: body.name,
      partnerId,
    });
  }

  async updatePartnerChannel(id: string, body: UpdatePartnerChannelDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const partnerChannel = await this.partnerChannelRepository.findOneById(id);

    if (!partnerChannel) {
      throw new NotFoundPartnerChannelException(id);
    }

    await this.partnerChannelRepository.updateOne(requestUser, partnerChannel, new ObjectUtil(partnerChannel, body).getValues());
  }

  async deletePartnerChannel(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const partnerChannel = await this.partnerChannelRepository.findOneById(id);

    if (!partnerChannel) {
      throw new NotFoundPartnerChannelException(id);
    }

    await this.partnerChannelRepository.deleteOne(requestUser, partnerChannel);
  }
}
