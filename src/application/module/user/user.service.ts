import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { And, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

import { UserType } from '@/application/domain/constant/enums';
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
import { ExcelService } from '@/common/excel/excel.service';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { ExcelFileDTO } from '@/constant/dto/excel-file.dto';
import {
  AccessDeninedException,
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
    private readonly excelService: ExcelService,
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
      take: Math.min(body.take, 1000),
    });

    return new UserListDTO(body, result);
  }

  async downloadUserListToExcel(body: GetUserListParamDTO) {
    const userList = await this.getUserList(body);

    const workBook = new this.excelService.excelJS.Workbook();
    const workSheet = workBook.addWorksheet('사용자 목록', { views: [{ state: 'frozen', ySplit: 1, xSplit: 2 }] });

    let workSheetRowCount = 1;

    const workSheetHeaderRow = workSheet.insertRow(workSheetRowCount++, [
      '번호',
      '이름',
      '이메일',
      '구분',
      '상태',
      '고객사번호',
      '고객사명',
      '판매채널번호',
      '판매채널명',
      '풀필먼트번호',
      '풀필먼트명',
      '센터번호',
      '센터명',
      '등록일시',
      '수정일시',
    ]);

    workSheetHeaderRow.font = { bold: true };
    workSheetHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
    workSheetHeaderRow.border = { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } };

    while (userList.rows.length > 0) {
      const user = userList.rows.shift();
      const workSheetRow = workSheet.insertRow(workSheetRowCount++, [
        user.id,
        user.name,
        user.email,
        user.type,
        user.status,
        user.partner?.id ?? null,
        user.partner?.name ?? '',
        user.partnerChannel?.id ?? null,
        user.partnerChannel?.name ?? '',
        user.fulfillment?.id ?? null,
        user.fulfillment?.name ?? '',
        user.fulfillmentCenter?.id ?? null,
        user.fulfillmentCenter?.name ?? '',
        DateTime.fromJSDate(user.createdAt).toSQL(),
        DateTime.fromJSDate(user.updatedAt).toSQL(),
      ]);

      workSheetRow.alignment = { vertical: 'middle' };
      workSheetRow.border = { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } };
    }

    return new ExcelFileDTO('사용자 목록.xlsx', await (workBook.xlsx.writeBuffer() as Promise<Buffer>));
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

    const type = body.type;

    if (!type) {
      throw new ValidationFailedException('type should not be empty');
    }

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        if (type !== UserType.PartnerUser) {
          throw new AccessDeninedException();
        }

        break;

      case UserType.FulfillmentAdmin:
        if (type !== UserType.FulfillmentUser) {
          throw new AccessDeninedException();
        }

        break;
    }

    const partnerId = requestUser.type === UserType.Admin ? body.partnerId : requestUser.partnerId;
    const fulfillmentId = requestUser.type === UserType.Admin ? body.fulfillmentId : requestUser.fulfillmentId;
    const partnerChannelId = body.partnerChannelId;
    const fulfillmentCenterId = body.fulfillmentCenterId;

    switch (type) {
      case UserType.PartnerAdmin:
        if (!partnerId) {
          throw new ValidationFailedException('partnerId should not be empty');
        }

        if (!(await this.partnerRepository.existsBy({ id: partnerId }))) {
          throw new NotFoundPartnerException(partnerId);
        }

        break;

      case UserType.PartnerUser:
        if (!partnerChannelId) {
          throw new ValidationFailedException('partnerChannelId should not be empty');
        }

        const partnerChannel = await this.partnerChannelRepository.findOneBy({ id: partnerChannelId });

        if (!partnerChannel) {
          throw new NotFoundPartnerChannelException(partnerChannelId);
        }

        if (partnerChannel.partnerId !== partnerId) {
          throw new AccessDeninedException();
        }

        break;

      case UserType.FulfillmentAdmin:
        if (!fulfillmentId) {
          throw new ValidationFailedException('fulfillmentId should not be empty');
        }

        if (!(await this.fulfillmentRepository.existsBy({ id: fulfillmentId }))) {
          throw new NotFoundFulfillmentException(fulfillmentId);
        }

        break;

      case UserType.FulfillmentUser:
        if (!fulfillmentCenterId) {
          throw new ValidationFailedException('fulfillmentCenterId should not be empty');
        }

        const fulfillmentCenter = await this.fulfillmentCenterRepository.findOneBy({ id: fulfillmentCenterId });

        if (!fulfillmentCenter) {
          throw new NotFoundPartnerChannelException(fulfillmentCenterId);
        }

        if (fulfillmentCenter.fulfillmentId !== fulfillmentId) {
          throw new AccessDeninedException();
        }

        break;
    }

    if (await this.userRepository.hasEmail(body.email)) {
      throw new AlreadyExistEmailException();
    }

    await this.userRepository.insertOne(requestUser, {
      type: body.type,
      email: body.email,
      password: new PasswordVO(body.password),
      name: body.name,
      partnerId,
      partnerChannelId,
      fulfillmentId,
      fulfillmentCenterId,
    });
  }

  async updateUser(id: string, body: UpdateUserDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundUserException(id);
    }

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        if (user.type === UserType.PartnerAdmin || user.partnerId !== requestUser.partnerId) {
          throw new AccessDeninedException();
        }

        break;

      case UserType.FulfillmentAdmin:
        if (user.type === UserType.FulfillmentAdmin || user.fulfillmentId !== requestUser.fulfillmentId) {
          throw new AccessDeninedException();
        }

        break;
    }

    const partnerId = (requestUser.type === UserType.Admin ? body.partnerId : requestUser.partnerId) ?? undefined;
    const fulfillmentId = (requestUser.type === UserType.Admin ? body.fulfillmentId : requestUser.fulfillmentId) ?? undefined;

    const partnerChannelId = [UserType.Admin, UserType.PartnerAdmin].includes(requestUser.type) ? body.partnerChannelId : undefined;
    const fulfillmentCenterId = [UserType.Admin, UserType.FulfillmentAdmin].includes(requestUser.type) ? body.fulfillmentCenterId : undefined;

    if (partnerId) {
      if (!(await this.partnerRepository.existsBy({ id: partnerId }))) {
        throw new NotFoundPartnerException(partnerId);
      }
    }

    if (partnerChannelId) {
      const partnerChannel = await this.partnerChannelRepository.findOneBy({ id: partnerChannelId });

      if (!partnerChannel) {
        throw new NotFoundPartnerChannelException(partnerChannelId);
      }

      if (partnerChannel.partnerId !== partnerId) {
        throw new AccessDeninedException();
      }
    }

    if (fulfillmentId) {
      if (!(await this.fulfillmentRepository.existsBy({ id: fulfillmentId }))) {
        throw new NotFoundFulfillmentException(fulfillmentId);
      }
    }

    if (fulfillmentCenterId) {
      const fulfillmentCenter = await this.fulfillmentCenterRepository.findOneBy({ id: fulfillmentCenterId });

      if (!fulfillmentCenter) {
        throw new NotFoundFulfillmentCenterException(fulfillmentCenterId);
      }

      if (fulfillmentCenter.fulfillmentId !== fulfillmentId) {
        throw new AccessDeninedException();
      }
    }

    await this.userRepository.updateOne(requestUser, user, {
      name: body.name && body.name !== user.name ? body.name : undefined,
      status: body.status && body.status !== user.status ? body.status : undefined,
      partnerId,
      partnerChannelId,
      fulfillmentId,
      fulfillmentCenterId,
    });
  }

  async deleteUser(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundUserException(id);
    }

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        if (user.partnerId !== requestUser.partnerId) {
          throw new AccessDeninedException();
        }

        break;

      case UserType.FulfillmentAdmin:
        if (user.fulfillmentId !== requestUser.fulfillmentId) {
          throw new AccessDeninedException();
        }

        break;
    }

    await this.userRepository.deleteOne(requestUser, user);
  }
}
