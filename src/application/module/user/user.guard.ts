import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { REQUIRED_USER_TYPES } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { AccessDeninedException, LoginRequiredException } from '@/constant/exceptions';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly requestContextService: RequestContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserTypes = this.reflector.getAllAndOverride(REQUIRED_USER_TYPES, [context.getClass(), context.getHandler()]);

    if (Array.isArray(requiredUserTypes) === false) {
      return true;
    }

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (!requestUser) {
      throw new LoginRequiredException();
    }

    if (!requiredUserTypes.includes(requestUser.type)) {
      throw new AccessDeninedException();
    }

    let isThrowForbiddenException = false;

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        isThrowForbiddenException = !requestUser.partnerId;

        break;

      case UserType.PartnerUser:
        isThrowForbiddenException = !requestUser.partnerChannelId;

        break;

      case UserType.FulfillmentAdmin:
        isThrowForbiddenException = !requestUser.fulfillmentId;

        break;

      case UserType.FulfillmentUser:
        isThrowForbiddenException = !requestUser.fulfillmentCenterId;

        break;
    }

    if (isThrowForbiddenException) {
      throw new AccessDeninedException();
    }

    return true;
  }
}
