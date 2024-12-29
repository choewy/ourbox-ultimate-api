import { Injectable } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { ConsignerRepository } from '@/application/domain/repository/consigner.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreateConsignerDTO } from '@/application/dto/request/create-consigner.dto';
import { GetConsignersParamDTO } from '@/application/dto/request/get-consigners-param.dto';
import { UpdateConsignerDTO } from '@/application/dto/request/update-consigner.dto';
import { ConsignersDTO } from '@/application/dto/response/consigners.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { AccessDeninedException, NotFoundConsignerException, NotFoundPartnerException } from '@/constant/exceptions';

@Injectable()
export class ConsignerService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly partnerRepository: PartnerRepository,
    private readonly consignerRepository: ConsignerRepository,
  ) {}

  async getConsigners(getConsignersParamDTO: GetConsignersParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.consignerRepository.findManyAndCount(
      requestUser.getPartnerId(getConsignersParamDTO.partnerId),
      getConsignersParamDTO.skip,
      getConsignersParamDTO.take,
    );

    return new ConsignersDTO(getConsignersParamDTO, rowsAndCount);
  }

  async createConsigner(body: CreateConsignerDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    const partnerId: string = requestUser.getPartnerId(body.partnerId);

    if (requestUser.type === UserType.Admin && partnerId) {
      if (!(await this.partnerRepository.hasById(partnerId))) {
        throw new NotFoundPartnerException(partnerId);
      }
    }

    await this.consignerRepository.insertOne(requestUser, {
      name: body.name,
      zipCode: body.zipCode,
      address: body.address,
      detailAddress: body.detailAddress,
      contact: body.contact,
      partnerId,
    });
  }

  async updateConsigner(id: string, body: UpdateConsignerDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const consigner = await this.consignerRepository.findOneById(id);

    if (!consigner) {
      throw new NotFoundConsignerException(id);
    }

    if (requestUser.type !== UserType.Admin && consigner.partnerId !== requestUser.partnerId) {
      throw new AccessDeninedException();
    }

    const partnerId: string = requestUser.getPartnerId(body.partnerId);

    if (requestUser.type === UserType.Admin && partnerId) {
      if (!(await this.partnerRepository.hasById(partnerId))) {
        throw new NotFoundPartnerException(partnerId);
      }
    }

    await this.consignerRepository.updateOne(requestUser, consigner, {
      name: body.name && body.name !== consigner.name ? body.name : undefined,
      zipCode: body.zipCode && body.zipCode !== consigner.zipCode ? body.zipCode : undefined,
      address: body.address && body.address !== consigner.address ? body.address : undefined,
      detailAddress: body.detailAddress && body.detailAddress !== consigner.detailAddress ? body.detailAddress : undefined,
      contact: body.contact && body.contact !== consigner.contact ? body.detailAddress : undefined,
      partnerId,
    });
  }

  async deleteConsigner(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const consigner = await this.consignerRepository.findOneById(id);

    if (!consigner) {
      throw new NotFoundConsignerException(id);
    }

    if (requestUser.type !== UserType.Admin && consigner.partnerId !== requestUser.partnerId) {
      throw new AccessDeninedException();
    }

    await this.consignerRepository.deleteOne(requestUser, consigner);
  }
}
