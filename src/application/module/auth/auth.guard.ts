import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './auth.service';
import { REQUIRED_AUTH } from '../../decorator/required-auth';

import { UserStatus } from '@/application/domain/constant/enums';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { RequestHeader, ResponseHeader } from '@/constant/enums';
import { InActivatedAccountException, InvalidTokenException } from '@/constant/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly requestContextService: RequestContextService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.requestContextService.setExecutionContext(context);

    const isRequiredAuth = this.reflector.getAllAndOverride(REQUIRED_AUTH, [context.getClass(), context.getHandler()]);

    if (!isRequiredAuth) {
      return true;
    }

    const headers = this.requestContextService.getRequest().headers;
    const accessToken = String(headers[RequestHeader.Authorization]).replace('Bearer ', '');
    const accessTokenResult = this.authService.verifyAccessToken(accessToken);

    if (!accessTokenResult.ok || !accessTokenResult.id || (accessTokenResult.error && !accessTokenResult.isExpired)) {
      throw new InvalidTokenException();
    }

    const user = await this.authService.getUser(accessTokenResult.id);

    if (!user) {
      throw new InvalidTokenException();
    }

    if (user.status !== UserStatus.Activated) {
      throw new InActivatedAccountException();
    }

    this.requestContextService.setRequestUser(user);

    if (accessTokenResult.isExpired) {
      const refreshToken = String(headers[RequestHeader.RefreshToken]);
      const refreshTokenResult = this.authService.verifyRefreshToken(refreshToken);

      if (!refreshTokenResult.ok || refreshTokenResult.error || refreshTokenResult.id !== accessTokenResult.id) {
        throw new InvalidTokenException();
      }

      const response = this.requestContextService.getResponse();

      response.set(ResponseHeader.AccessToken, this.authService.issueAccessToken(user.id));
      response.set(ResponseHeader.RefreshToken, this.authService.issueRefreshToken(user.id));
    }

    return true;
  }
}
