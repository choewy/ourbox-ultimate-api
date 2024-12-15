import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { REQUIRED_AUTH } from './decorator/required-auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isRequiredAuth = this.reflector.getAllAndOverride(REQUIRED_AUTH, [context.getClass(), context.getHandler()]);

    if (!isRequiredAuth) {
      return true;
    }

    return false;
  }
}
