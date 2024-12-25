import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { ConsignerRepository } from '@/application/domain/repository/consigner.repository';
import { CreateConsignerDTO } from '@/application/dto/request/create-consigner.dto';
import { GetConsignersParamDTO } from '@/application/dto/request/get-consigners-param.dto';
import { ConsignersDTO } from '@/application/dto/response/consigners.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class ConsignerService {
  constructor(
    private readonly requestContextService: RequestContextService,
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

  async createConsigner(createConsignerDTO: CreateConsignerDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.consignerRepository.insert({
      name: createConsignerDTO.name,
      zipCode: createConsignerDTO.zipCode,
      address: createConsignerDTO.address,
      detailAddress: createConsignerDTO.detailAddress,
      contact: createConsignerDTO.contact,
      partnerId: requestUser.getPartnerId(createConsignerDTO.partnerId),
    });
  }
}
