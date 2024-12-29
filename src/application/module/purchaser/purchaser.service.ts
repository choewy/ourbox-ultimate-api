import { Injectable } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { PurchaserRepository } from '@/application/domain/repository/purchaser.repository';
import { CreatePurchaserDTO } from '@/application/dto/request/create-purchaser.dto';
import { GetPurchasersParamDTO } from '@/application/dto/request/get-purchasers-param.dto';
import { UpdatePurchaserDTO } from '@/application/dto/request/update-purchaser.dto';
import { PurchasersDTO } from '@/application/dto/response/purchasers.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { AccessDeninedException, NotFoundPartnerException, NotFoundPurchaserException } from '@/constant/exceptions';

@Injectable()
export class PurchaserService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly partnerRepository: PartnerRepository,
    private readonly purchaserRepository: PurchaserRepository,
  ) {}

  async getPurchasers(param: GetPurchasersParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.purchaserRepository.findManyAndCount(requestUser.getPartnerId(param.partnerId), param.skip, param.take);

    return new PurchasersDTO(param, rowsAndCount);
  }

  async createPurchaser(body: CreatePurchaserDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    const partnerId: string = requestUser.getPartnerId(body.partnerId);

    if (requestUser.type === UserType.Admin && partnerId) {
      if (!(await this.partnerRepository.hasById(partnerId))) {
        throw new NotFoundPartnerException(partnerId);
      }
    }

    await this.purchaserRepository.insert({
      name: body.name,
      zipCode: body.zipCode,
      address: body.address,
      detailAddress: body.detailAddress,
      contact: body.contact,
      partnerId,
    });
  }

  async updatePurchaser(id: string, body: UpdatePurchaserDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const purchaser = await this.purchaserRepository.findOneById(id);

    if (!purchaser) {
      throw new NotFoundPurchaserException(id);
    }

    if (requestUser.type !== UserType.Admin && purchaser.partnerId !== requestUser.partnerId) {
      throw new AccessDeninedException();
    }

    const partnerId: string = requestUser.getPartnerId(body.partnerId);

    if (requestUser.type === UserType.Admin && partnerId) {
      if (!(await this.partnerRepository.hasById(partnerId))) {
        throw new NotFoundPartnerException(partnerId);
      }
    }

    await this.purchaserRepository.update(id, {
      name: body.name && body.name !== purchaser.name ? body.name : undefined,
      zipCode: body.zipCode && body.zipCode !== purchaser.zipCode ? body.zipCode : undefined,
      address: body.address && body.address !== purchaser.address ? body.address : undefined,
      detailAddress: body.detailAddress && body.detailAddress !== purchaser.detailAddress ? body.detailAddress : undefined,
      contact: body.contact && body.contact !== purchaser.contact ? body.detailAddress : undefined,
      partnerId,
    });
  }

  async deletePurchaser(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const purchaser = await this.purchaserRepository.findOneById(id);

    if (!purchaser) {
      throw new NotFoundPurchaserException(id);
    }

    if (requestUser.type !== UserType.Admin && purchaser.partnerId !== requestUser.partnerId) {
      throw new AccessDeninedException();
    }

    await this.purchaserRepository.deleteOneById(id);
  }
}
