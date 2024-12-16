import { Injectable } from '@nestjs/common';

import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';

@Injectable()
export class FulfillmentService {
  constructor(private readonly fulfillmentRepository: FulfillmentRepository) {}

  async createFulfillment(createFulfillmentDTO: CreateFulfillmentDTO) {
    await this.fulfillmentRepository.insert({
      name: createFulfillmentDTO.name,
    });
  }
}
