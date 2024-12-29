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

    const user = this.requestContextService.getRequestUser<User>();

    if (!user) {
      throw new LoginRequiredException();
    }

    if (!requiredUserTypes.includes(user.type)) {
      throw new AccessDeninedException();
    }

    let isThrowForbiddenException = false;

    switch (user.type) {
      case UserType.PartnerAdmin:
        isThrowForbiddenException = !user.partnerId;

        break;

      case UserType.PartnerUser:
        isThrowForbiddenException = !user.partnerChannelId;

        break;

      case UserType.FulfillmentAdmin:
        isThrowForbiddenException = !user.fulfillmentId;

        break;

      case UserType.FulfillmentUser:
        isThrowForbiddenException = !user.fulfillmentCenterId;

        break;
    }

    if (isThrowForbiddenException) {
      throw new AccessDeninedException();
    }

    return true;
  }
}
