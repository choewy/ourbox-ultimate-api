import { Injectable } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { GetFulfillmentCentersParamDTO } from '@/application/dto/request/get-fulfillment-centers-param.dto';
import { GetFulfillmentsParamDTO } from '@/application/dto/request/get-fulfillments-param.dto';
import { UpdateFulfillmentCenterDTO } from '@/application/dto/request/update-fulfillment-center.dto';
import { UpdateFulfillmentDTO } from '@/application/dto/request/update-fulfillment.dto';
import { FulfillmentCentersDTO } from '@/application/dto/response/fulfillment-centers.dto';
import { FulfillmentsDTO } from '@/application/dto/response/fulfillments.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { AlreadyExistFulfillmentCenterCodeException, NotFoundFulfillmentCenterException, NotFoundFulfillmentException } from '@/constant/exceptions';
import { ObjectUtil } from '@/constant/util/object.util';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly fulfillmentCenterRepository: FulfillmentCenterRepository,
  ) {}

  async getFulfillments(param: GetFulfillmentsParamDTO) {
    const rowsAndCount = await this.fulfillmentRepository.findManyAndCount(param.skip, param.take);

    return new FulfillmentsDTO(param, rowsAndCount);
  }

  async createFulfillment(body: CreateFulfillmentDTO) {
    await this.fulfillmentRepository.insert({
      name: body.name,
    });
  }

  async updateFulfillment(id: string, body: UpdateFulfillmentDTO) {
    const fulfillment = await this.fulfillmentRepository.findOneById(id);

    if (!fulfillment) {
      throw new NotFoundFulfillmentException(id);
    }

    await this.fulfillmentRepository.update(id, new ObjectUtil(fulfillment, body).getValues());
  }

  async deleteFulfillment(id: string) {
    if (!(await this.fulfillmentRepository.hasById(id))) {
      throw new NotFoundFulfillmentException(id);
    }

    await this.fulfillmentRepository.deleteOneById(id);
  }

  async getFulfillmentCenters(param: GetFulfillmentCentersParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const rowsAndCount = await this.fulfillmentCenterRepository.findManyAndCount(param.skip, param.take, requestUser.getFulfillmentId(param.fulfillmentId));

    return new FulfillmentCentersDTO(param, rowsAndCount);
  }

  async createFulfillmentCenter(body: CreateFulfillmentCenterDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    const fulfillmentId = requestUser.getFulfillmentId(body.fulfillmentId);

    if (requestUser.type === UserType.Admin && fulfillmentId) {
      if (!(await this.fulfillmentRepository.hasById(fulfillmentId))) {
        throw new NotFoundFulfillmentException(fulfillmentId);
      }
    }

    if (await this.fulfillmentCenterRepository.hasKey(requestUser.fulfillmentId, body.code)) {
      throw new AlreadyExistFulfillmentCenterCodeException();
    }

    await this.fulfillmentCenterRepository.insert({
      code: body.code,
      name: body.name,
      fulfillmentId,
    });
  }

  async updateFulfillmentCenter(id: string, body: UpdateFulfillmentCenterDTO) {
    const fulfillmentCenter = await this.fulfillmentCenterRepository.findOneById(id);

    if (!fulfillmentCenter) {
      throw new NotFoundFulfillmentCenterException(id);
    }

    if (body.code && (await this.fulfillmentCenterRepository.hasKey(fulfillmentCenter.fulfillmentId, body.code))) {
      throw new AlreadyExistFulfillmentCenterCodeException();
    }

    await this.fulfillmentCenterRepository.update(id, new ObjectUtil(fulfillmentCenter, body).getValues());
  }

  async deleteFulfillmentCenter(id: string) {
    if (!(await this.fulfillmentCenterRepository.hasById(id))) {
      throw new NotFoundFulfillmentCenterException(id);
    }

    await this.fulfillmentCenterRepository.deleteOneById(id);
  }
}
