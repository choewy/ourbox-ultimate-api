import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { DELIVERY_COMPANIES } from '@/application/domain/constant/constant';
import { DeliveryCompanyRepository } from '@/application/domain/repository/delivery-company.repository';
import { DeliveryCompanyDTO } from '@/application/dto/response/delivery-company.dto';

@Injectable()
export class DeliveryCompanyService implements OnApplicationBootstrap {
  constructor(private readonly deliveryCompanyRepository: DeliveryCompanyRepository) {}

  async onApplicationBootstrap() {
    for (const deliveryCompany of DELIVERY_COMPANIES) {
      if (await this.deliveryCompanyRepository.hasByCode(deliveryCompany.code)) {
        continue;
      }

      await this.deliveryCompanyRepository.insert(deliveryCompany);
    }
  }

  async getDeliveryCompanies() {
    return (await this.deliveryCompanyRepository.find()).map((deliveryCompany) => new DeliveryCompanyDTO(deliveryCompany));
  }
}
