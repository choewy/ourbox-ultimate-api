import { Injectable } from '@nestjs/common';

import { UserType } from '@/application/domain/constant/enums';
import { FulfillmentCenter } from '@/application/domain/entity/fulfillment-center.entity';
import { Fulfillment } from '@/application/domain/entity/fulfillment.entity';
import { PartnerChannel } from '@/application/domain/entity/partner-channel.entity';
import { Partner } from '@/application/domain/entity/partner.entity';
import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { UserRepository } from '@/application/domain/repository/user.repository';
import { CreateUserDTO } from '@/application/dto/request/create-user.dto';
import { GetUserssParamDTO } from '@/application/dto/request/get-users-param.dto';
import { UsersDTO } from '@/application/dto/response/users.dto';
import {
  AlreadyExistEmailException,
  NotFoundFulfillmentCenterException,
  NotFoundFulfillmentException,
  NotFoundPartnerChannelException,
  NotFoundPartnerException,
  ValidationFailedException,
} from '@/constant/exceptions';
import { PasswordVO } from '@/constant/vo/password.vo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly fulfillmentCenterRepository: FulfillmentCenterRepository,
  ) {}

  async getUsers(param: GetUserssParamDTO) {
    const rowsAndCount = await this.userRepository.findManyAndCount(param.skip, param.take);

    return new UsersDTO(param, rowsAndCount);
  }

  async createUser(body: CreateUserDTO) {
    if (await this.userRepository.hasEmail(body.email)) {
      throw new AlreadyExistEmailException();
    }

    let partner: Partner;
    let partnerChannel: PartnerChannel;
    let fulfillment: Fulfillment;
    let fulfillmentCenter: FulfillmentCenter;

    switch (body.type) {
      case UserType.PartnerAdmin:
        if (!body.partnerId) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.partnerId,
              property: 'partnerId',
              children: [],
              constraints: {
                isNotEmpty: 'partnerId should not be empty',
              },
            },
          ]);
        }

        partner = await this.partnerRepository.findOneById(body.partnerId);

        if (!partner) {
          throw new NotFoundPartnerException(body.partnerId);
        }

        break;

      case UserType.PartnerUser:
        if (!body.partnerChannelId) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.partnerChannelId,
              property: 'partnerChannelId',
              children: [],
              constraints: {
                isNotEmpty: 'partnerChannelId should not be empty',
              },
            },
          ]);
        }

        partnerChannel = await this.partnerChannelRepository.findOneById(body.partnerChannelId);
        partner = partnerChannel?.partner;

        if (!partnerChannel) {
          throw new NotFoundPartnerChannelException(body.partnerChannelId);
        }

        break;

      case UserType.FulfillmentAdmin:
        if (!body.fulfillmentId) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.fulfillmentId,
              property: 'fulfillmentId',
              children: [],
              constraints: {
                isNotEmpty: 'fulfillmentId should not be empty',
              },
            },
          ]);
        }

        fulfillment = await this.fulfillmentRepository.findOneById(body.fulfillmentId);

        if (!fulfillment) {
          throw new NotFoundFulfillmentException(body.fulfillmentId);
        }

        break;

      case UserType.FulfillmentUser:
        if (!body.fulfillmentCenterId) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.fulfillmentCenterId,
              property: 'fulfillmentCenterId',
              children: [],
              constraints: {
                isNotEmpty: 'fulfillmentCenterId should not be empty',
              },
            },
          ]);
        }

        fulfillmentCenter = await this.fulfillmentCenterRepository.findOneById(body.fulfillmentCenterId);
        fulfillment = fulfillmentCenter?.fulfillment;

        if (!fulfillmentCenter) {
          throw new NotFoundFulfillmentCenterException(body.fulfillmentCenterId);
        }

        break;
    }

    await this.userRepository.insert({
      type: body.type,
      email: body.email,
      password: new PasswordVO(body.password),
      name: body.name,
      partner,
      partnerChannel,
      fulfillment,
      fulfillmentCenter,
    });
  }
}
