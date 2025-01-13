import { Injectable } from '@nestjs/common';

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
import { GetUsersParamDTO } from '@/application/dto/request/get-users-param.dto';
import { UpdateUserDTO } from '@/application/dto/request/update-user.dto';
import { UserListDTO } from '@/application/dto/response/user-list.dto';
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

  async getUserList(body: GetUsersParamDTO) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.partner', 'user.partner', 'partner')
      .leftJoinAndMapOne('user.partnerChannel', 'user.partnerChannel', 'partnerChannel')
      .leftJoinAndMapOne('user.fulfillment', 'user.fulfillment', 'fulfillment')
      .leftJoinAndMapOne('user.fulfillmentCenter', 'user.fulfillmentCenter', 'fulfillmentCenter')
      .where('1 = 1')
      .skip(Math.min(body.skip, 100))
      .take(Math.min(body.take, 100));

    const requestUser = this.requestContextService.getRequestUser<User>();

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        qb.andWhere('partner.id = :id', { id: requestUser.partnerId });
        break;

      case UserType.PartnerUser:
        qb.andWhere('partnerChannel.id = :id', { id: requestUser.partnerChannelId });
        break;

      case UserType.FulfillmentAdmin:
        qb.andWhere('fulfillment.id = :id', { id: requestUser.fulfillmentId });
        break;

      case UserType.FulfillmentUser:
        qb.andWhere('fulfillmentCenter.id = :id', { id: requestUser.fulfillmentCenterId });
        break;
    }

    if (body.keyword?.id) {
      qb.andWhere('user.id = :id', { id: body.keyword.id });
    }

    if (body.keyword?.name) {
      qb.andWhere('user.name LIKE "%:name%"', { name: body.keyword.name });
    }

    if (body.keyword?.type) {
      qb.andWhere('user.type = :type', { type: body.keyword.type });
    }

    if (body.keyword?.email) {
      qb.andWhere('user.email LIKE "%:email%"', { email: body.keyword.email });
    }

    if (body.keyword?.partner) {
      qb.andWhere('partner.name LIKE "%:partner%"', { partner: body.keyword.partner });
    }

    if (body.keyword?.partnerChannel) {
      qb.andWhere('partnerChannel.name LIKE "%:partnerChannel%"', { partnerChannel: body.keyword.partnerChannel });
    }

    if (body.keyword?.fulfillment) {
      qb.andWhere('fulfillment.name LIKE "%:fulfillment%"', { fulfillment: body.keyword.fulfillment });
    }

    if (body.keyword?.fulfillmentCenter) {
      qb.andWhere('fulfillmentCenter.name LIKE "%:fulfillmentCenter%"', { fulfillmentCenter: body.keyword.fulfillmentCenter });
    }

    if (body.dateRange?.createdAt?.startDate) {
      qb.andWhere('user.createdAt >= :startDate', { startDate: body.dateRange.createdAt.startDate.toSQL() });
    }

    if (body.dateRange?.createdAt?.endDate) {
      qb.andWhere('user.createdAt <= :endDate', { endDate: body.dateRange.createdAt.endDate.toSQL() });
    }

    if (body.dateRange?.updatedAt?.startDate) {
      qb.andWhere('user.updatedAt >= :startDate', { startDate: body.dateRange.updatedAt.startDate.toSQL() });
    }

    if (body.dateRange?.updatedAt?.endDate) {
      qb.andWhere('user.updatedAt <= :endDate', { endDate: body.dateRange.updatedAt.endDate.toSQL() });
    }

    if (body.orderBy?.name) {
      qb.addOrderBy('user.name', body.orderBy.name);
    }

    if (body.orderBy?.type) {
      qb.addOrderBy('user.type', body.orderBy.type);
    }

    if (body.orderBy?.name) {
      qb.addOrderBy('user.name', body.orderBy.name);
    }

    if (body.orderBy?.email) {
      qb.addOrderBy('user.email', body.orderBy.email);
    }

    if (body.orderBy?.createdAt) {
      qb.addOrderBy('user.createdAt', body.orderBy.createdAt);
    }

    if (body.orderBy?.updatedAt) {
      qb.addOrderBy('user.updatedAt', body.orderBy.updatedAt);
    }

    if (body.orderBy?.partner) {
      qb.addOrderBy('partner.name', body.orderBy.partner);
    }

    if (body.orderBy?.partnerChannel) {
      qb.addOrderBy('partnerChannel.name', body.orderBy.partnerChannel);
    }

    if (body.orderBy?.fulfillment) {
      qb.addOrderBy('fulfillment.name', body.orderBy.fulfillment);
    }

    if (body.orderBy?.fulfillmentCenter) {
      qb.addOrderBy('fulfillmentCenter.name', body.orderBy.fulfillmentCenter);
    }

    const rowsAndCount = await qb.getManyAndCount();

    return new UserListDTO(body, rowsAndCount);
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
