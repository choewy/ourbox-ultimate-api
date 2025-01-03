import { Injectable } from '@nestjs/common';

import { User } from '@/application/domain/entity/user.entity';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { GetFulfillmentsParamDTO } from '@/application/dto/request/get-fulfillments-param.dto';
import { UpdateFulfillmentDTO } from '@/application/dto/request/update-fulfillment.dto';
import { FulfillmentsDTO } from '@/application/dto/response/fulfillments.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { NotFoundFulfillmentException } from '@/constant/exceptions';
import { ObjectUtil } from '@/constant/util/object.util';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly fulfillmentRepository: FulfillmentRepository,
  ) {}

  async getFulfillments(param: GetFulfillmentsParamDTO) {
    const rowsAndCount = await this.fulfillmentRepository.findManyAndCount(param.skip, param.take);

    return new FulfillmentsDTO(param, rowsAndCount);
  }

  async createFulfillment(body: CreateFulfillmentDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    await this.fulfillmentRepository.insertOne(requestUser, { name: body.name });
  }

  async updateFulfillment(id: string, body: UpdateFulfillmentDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillment = await this.fulfillmentRepository.findOneById(id);

    if (!fulfillment) {
      throw new NotFoundFulfillmentException(id);
    }

    await this.fulfillmentRepository.updateOne(requestUser, fulfillment, new ObjectUtil(fulfillment, body).getValues());
  }

  async deleteFulfillment(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillment = await this.fulfillmentRepository.findOneById(id);

    if (!fulfillment) {
      throw new NotFoundFulfillmentException(id);
    }

    await this.fulfillmentRepository.deleteOne(requestUser, fulfillment);
  }
}
