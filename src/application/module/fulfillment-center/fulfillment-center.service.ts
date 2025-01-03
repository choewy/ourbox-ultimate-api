import { Injectable } from '@nestjs/common';

import { ObjectUtil } from '../../../constant/util/object.util';

import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { GetFulfillmentCentersParamDTO } from '@/application/dto/request/get-fulfillment-centers-param.dto';
import { UpdateFulfillmentCenterDTO } from '@/application/dto/request/update-fulfillment-center.dto';
import { FulfillmentCentersDTO } from '@/application/dto/response/fulfillment-centers.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { AlreadyExistFulfillmentCenterCodeException, NotFoundFulfillmentCenterException, NotFoundFulfillmentException } from '@/constant/exceptions';

@Injectable()
export class FulfillmentCenterService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly fulfillmentCenterRepository: FulfillmentCenterRepository,
  ) {}

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

    await this.fulfillmentCenterRepository.insertOne(requestUser, {
      code: body.code,
      name: body.name,
      fulfillmentId,
    });
  }

  async updateFulfillmentCenter(id: string, body: UpdateFulfillmentCenterDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillmentCenter = await this.fulfillmentCenterRepository.findOneById(id);

    if (!fulfillmentCenter) {
      throw new NotFoundFulfillmentCenterException(id);
    }

    if (body.code && (await this.fulfillmentCenterRepository.hasKey(fulfillmentCenter.fulfillmentId, body.code))) {
      throw new AlreadyExistFulfillmentCenterCodeException();
    }

    await this.fulfillmentCenterRepository.updateOne(requestUser, fulfillmentCenter, new ObjectUtil(fulfillmentCenter, body).getValues());
  }

  async deleteFulfillmentCenter(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillmentCenter = await this.fulfillmentCenterRepository.findOneById(id);

    if (!fulfillmentCenter) {
      throw new NotFoundFulfillmentCenterException(id);
    }

    await this.fulfillmentCenterRepository.deleteOne(requestUser, fulfillmentCenter);
  }
}
