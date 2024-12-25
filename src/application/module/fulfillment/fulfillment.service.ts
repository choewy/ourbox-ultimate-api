import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { AlreadyExistFulfillmentCenterCodeException } from '@/constant/exceptions';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly fulfillmentCenterRepository: FulfillmentCenterRepository,
  ) {}

  async createFulfillment(createFulfillmentDTO: CreateFulfillmentDTO) {
    await this.fulfillmentRepository.insert({
      name: createFulfillmentDTO.name,
    });
  }

  async createFulfillmentCenter(createFulfillmentCenterDTO: CreateFulfillmentCenterDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    if (await this.fulfillmentCenterRepository.hasKey(requestUser.fulfillmentId, createFulfillmentCenterDTO.code)) {
      throw new AlreadyExistFulfillmentCenterCodeException();
    }

    await this.fulfillmentCenterRepository.insert({
      fulfillmentId: requestUser.fulfillmentId,
      code: createFulfillmentCenterDTO.code,
      name: createFulfillmentCenterDTO.name,
    });
  }
}
