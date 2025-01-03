import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { GetPartnersParamDTO } from '@/application/dto/request/get-partners-param.dto';
import { UpdatePartnerDTO } from '@/application/dto/request/update-partner.dto';
import { PartnersDTO } from '@/application/dto/response/partners.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { NotFoundPartnerException } from '@/constant/exceptions';
import { ObjectUtil } from '@/constant/util/object.util';

@Injectable()
export class PartnerService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly partnerRepository: PartnerRepository,
  ) {}

  async getPartners(param: GetPartnersParamDTO) {
    const rowsAndCount = await this.partnerRepository.findManyAndCount(param.skip, param.take);

    return new PartnersDTO(param, rowsAndCount);
  }

  async createPartner(body: CreatePartnerDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.partnerRepository.insertOne(requestUser, { name: body.name });
  }

  async updatePartner(id: string, body: UpdatePartnerDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const partner = await this.partnerRepository.findOneById(id);

    if (!partner) {
      throw new NotFoundPartnerException(id);
    }

    await this.partnerRepository.updateOne(requestUser, partner, new ObjectUtil(partner, body).getValues());
  }

  async deletePartner(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const partner = await this.partnerRepository.findOneById(id);

    if (!partner) {
      throw new NotFoundPartnerException(id);
    }

    await this.partnerRepository.deleteOne(requestUser, partner);
  }
}
