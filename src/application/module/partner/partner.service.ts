import { Injectable } from '@nestjs/common';

import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';

@Injectable()
export class PartnerService {
  constructor(private readonly partnerRepository: PartnerRepository) {}

  async createPartner(createPartnerDTO: CreatePartnerDTO) {
    await this.partnerRepository.insert({
      name: createPartnerDTO.name,
    });
  }
}
