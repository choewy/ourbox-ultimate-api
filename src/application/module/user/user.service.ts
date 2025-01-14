import { Injectable } from '@nestjs/common';
import { And, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

import { UserType } from '@/application/domain/constant/enums';
import { FulfillmentCenter } from '@/application/domain/entity/fulfillment-center.entity';
import { Fulfillment } from '@/application/domain/entity/fulfillment.entity';
import { PartnerChannel } from '@/application/domain/entity/partner-channel.entity';
import { Partner } from '@/application/domain/entity/partner.entity';
import { User } from '@/application/domain/entity/user.entity';
import { FulfillmentCenterRepository } from '@/application/domain/repository/fulfillment-center.repository';
import { FulfillmentRepository } from '@/application/domain/repository/fulfillment.repository';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { PartnerRepository } from '@/application/domain/repository/partner.repository';
import { UserRepository } from '@/application/domain/repository/user.repository';
import { CreateUserDTO } from '@/application/dto/request/create-user.dto';
import { GetUserListParamDTO } from '@/application/dto/request/get-user-list-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateUserDTO } from '@/application/dto/request/update-user.dto';
import { UserListDTO } from '@/application/dto/response/user-list.dto';
import { UserDTO } from '@/application/dto/response/user.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import {
  AlreadyExistEmailException,
  NotFoundFulfillmentCenterException,
  NotFoundFulfillmentException,
  NotFoundPartnerChannelException,
  NotFoundPartnerException,
  NotFoundUserException,
  ValidationFailedException,
} from '@/constant/exceptions';
import { PasswordVO } from '@/constant/vo/password.vo';

@Injectable()
export class UserService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly userRepository: UserRepository,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly fulfillmentCenterRepository: FulfillmentCenterRepository,
  ) {}

  async getUserList(body: GetUserListParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

    const result = await this.userRepository.findAndCount({
      relations: {
        partner: true,
        partnerChannel: true,
        fulfillment: true,
        fulfillmentCenter: true,
      },
      where: {
        partnerId: requestUser.type === UserType.PartnerAdmin ? requestUser.partnerId : undefined,
        partnerChannelId: requestUser.type === UserType.PartnerUser ? requestUser.partnerChannelId : undefined,
        fulfillmentId: requestUser.type === UserType.FulfillmentAdmin ? requestUser.fulfillmentId : undefined,
        fulfillmentCenterId: requestUser.type === UserType.FulfillmentUser ? requestUser.fulfillmentCenterId : undefined,
        id: body.keyword?.id ?? undefined,
        name: body.keyword?.name ? Like(`%${body.keyword.name}%`) : undefined,
        email: body.keyword?.email ? Like(`%${body.keyword.email}%`) : undefined,
        partner: { name: body.keyword?.partner ? Like(`%${body.keyword.partner}%`) : undefined },
        partnerChannel: { name: body.keyword?.partnerChannel ? Like(`%${body.keyword.partnerChannel}%`) : undefined },
        fulfillment: { name: body.keyword?.fulfillment ? Like(`%${body.keyword.fulfillment}%`) : undefined },
        fulfillmentCenter: { name: body.keyword?.fulfillmentCenter ? Like(`%${body.keyword.fulfillmentCenter}%`) : undefined },
        createdAt:
          body.dateRange?.createdAt?.startDate || body.dateRange?.createdAt?.endDate
            ? And(
                ...[
                  body.dateRange.createdAt?.startDate ? MoreThanOrEqual(body.dateRange.createdAt.startDate.toJSDate()) : undefined,
                  body.dateRange.createdAt?.endDate ? LessThanOrEqual(body.dateRange.createdAt.endDate.toJSDate()) : undefined,
                ].filter((val) => val),
              )
            : undefined,
        updatedAt:
          body.dateRange?.updatedAt?.startDate || body.dateRange?.updatedAt?.endDate
            ? And(
                ...[
                  body.dateRange.updatedAt?.startDate ? MoreThanOrEqual(body.dateRange.updatedAt.startDate.toJSDate()) : undefined,
                  body.dateRange.updatedAt?.endDate ? LessThanOrEqual(body.dateRange.updatedAt.endDate.toJSDate()) : undefined,
                ].filter((val) => val),
              )
            : undefined,
      },
      order: {
        name: body.orderBy?.name ?? undefined,
        type: body.orderBy?.type ?? undefined,
        email: body.orderBy?.email ?? undefined,
        createdAt: body.orderBy?.createdAt ?? undefined,
        updatedAt: body.orderBy?.updatedAt ?? undefined,
        partner: { name: body.orderBy?.partner ?? undefined },
        partnerChannel: { name: body.orderBy?.partnerChannel ?? undefined },
        fulfillment: { name: body.orderBy?.fulfillment ?? undefined },
        fulfillmentCenter: { name: body.orderBy?.fulfillmentCenter ?? undefined },
      },
      skip: Math.max(body.skip, 0),
      take: Math.min(body.take, 100),
    });

    return new UserListDTO(body, result);
  }

  async getUserById(param: IdParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const user = await this.userRepository.findOne({
      relations: {
        partner: true,
        partnerChannel: true,
        fulfillment: true,
        fulfillmentCenter: true,
      },
      where: {
        id: param.id,
        partnerId: requestUser.type === UserType.PartnerAdmin ? requestUser.partnerId : undefined,
        partnerChannelId: requestUser.type === UserType.PartnerUser ? requestUser.partnerChannelId : undefined,
        fulfillmentId: requestUser.type === UserType.FulfillmentAdmin ? requestUser.fulfillmentId : undefined,
        fulfillmentCenterId: requestUser.type === UserType.FulfillmentUser ? requestUser.fulfillmentCenterId : undefined,
      },
    });

    if (!user) {
      throw new NotFoundUserException(param.id);
    }

    return new UserDTO(user);
  }

  async createUser(body: CreateUserDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();

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

    await this.userRepository.insertOne(requestUser, {
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

  async updateUser(id: string, body: UpdateUserDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundUserException(id);
    }

    if (body.partnerId && !(await this.partnerRepository.hasById(body.partnerId))) {
      throw new NotFoundPartnerException(body.partnerId);
    }

    if (body.partnerChannelId && !(await this.partnerChannelRepository.hasById(body.partnerChannelId))) {
      throw new NotFoundPartnerChannelException(body.partnerChannelId);
    }

    if (body.fulfillmentId && !(await this.fulfillmentRepository.hasById(body.fulfillmentId))) {
      throw new NotFoundFulfillmentException(body.fulfillmentId);
    }

    if (body.fulfillmentCenterId && !(await this.fulfillmentCenterRepository.hasById(body.fulfillmentCenterId))) {
      throw new NotFoundFulfillmentCenterException(body.fulfillmentCenterId);
    }

    await this.userRepository.updateOne(requestUser, user, {
      name: body.name && body.name !== user.name ? body.name : undefined,
      status: body.status && body.status !== user.status ? body.status : undefined,
      partnerId: body.partnerId && body.partnerId !== user.partnerId ? body.partnerId : undefined,
      partnerChannelId: body.partnerChannelId && body.partnerChannelId !== user.partnerChannelId ? body.partnerChannelId : undefined,
      fulfillmentId: body.fulfillmentId && body.fulfillmentId !== user.fulfillmentId ? body.fulfillmentId : undefined,
      fulfillmentCenterId: body.fulfillmentCenterId && body.fulfillmentCenterId !== user.fulfillmentCenterId ? body.fulfillmentCenterId : undefined,
    });
  }

  async deleteUser(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundUserException(id);
    }

    await this.userRepository.deleteOne(requestUser, user);
  }
}
