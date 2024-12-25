import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { PurchaserRepository } from '@/application/domain/repository/purchaser.repository';
import { CreatePurchaserDTO } from '@/application/dto/request/create-purchaser.dto';
import { GetPurchasersParamDTO } from '@/application/dto/request/get-purchasers-param.dto';
import { PurchasersDTO } from '@/application/dto/response/purchasers.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class PurchaserService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly purchaserRepository: PurchaserRepository,
  ) {}

  async getConsigners(getPurchasersParamDTO: GetPurchasersParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.purchaserRepository.findManyAndCount(
      requestUser.getPartnerId(getPurchasersParamDTO.partnerId),
      getPurchasersParamDTO.skip,
      getPurchasersParamDTO.take,
    );

    return new PurchasersDTO(getPurchasersParamDTO, rowsAndCount);
  }

  async createConsigner(createPurchaserDTO: CreatePurchaserDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.purchaserRepository.insert({
      name: createPurchaserDTO.name,
      zipCode: createPurchaserDTO.zipCode,
      address: createPurchaserDTO.address,
      detailAddress: createPurchaserDTO.detailAddress,
      contact: createPurchaserDTO.contact,
      partnerId: requestUser.getPartnerId(createPurchaserDTO.partnerId),
    });
  }
}
