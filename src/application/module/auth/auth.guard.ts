import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './auth.service';

import { REQUIRED_AUTH } from '@/application/decorator/required-auth';
import { UserStatus } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { RequestContextService } from '@/common/request-context/request-context.service';
import { RequestHeader, ResponseHeader } from '@/constant/enums';
import { InActivatedAccountException, InvalidTokenException, LoginRequiredException } from '@/constant/exceptions';

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
    const accessToken = String(headers[RequestHeader.Authorization] ?? '').replace('Bearer ', '');

    if (!accessToken) {
      throw new LoginRequiredException();
    }

    const accessTokenResult = this.authService.verifyAccessToken(accessToken);

    if (!accessTokenResult.ok || !accessTokenResult.payload || (accessTokenResult.error && !accessTokenResult.isExpired)) {
      throw new InvalidTokenException();
    }

    const accessTokenPayload = accessTokenResult.payload;
    const requestUser = await this.authService.getUser(accessTokenPayload.id);

    if (!requestUser) {
      throw new InvalidTokenException();
    }

    if (requestUser.status !== UserStatus.Activated) {
      throw new InActivatedAccountException();
    }

    let originUser: User = null;

    if (accessTokenPayload.originId) {
      originUser = await this.authService.getUser(accessTokenPayload.originId);

      if (!originUser) {
        throw new InvalidTokenException();
      }

      if (originUser.status !== UserStatus.Activated) {
        throw new InActivatedAccountException();
      }

      this.requestContextService.setOriginUser(originUser);
    }

    this.requestContextService.setJwtPayload(accessTokenPayload);
    this.requestContextService.setRequestUser(requestUser);

    if (accessTokenResult.isExpired) {
      const refreshToken = String(headers[RequestHeader.RefreshToken]);
      const refreshTokenResult = this.authService.verifyRefreshToken(refreshToken);
      const refreshTokenPayload = refreshTokenResult.payload;

      if (!refreshTokenResult.ok || refreshTokenResult.error || refreshTokenPayload.id !== accessTokenPayload.id) {
        throw new InvalidTokenException();
      }

      const response = this.requestContextService.getResponse();
      const jwtDTO = this.authService.issueTokens(requestUser, originUser);

      response.set(ResponseHeader.AccessToken, jwtDTO.accessToken);
      response.set(ResponseHeader.RefreshToken, jwtDTO.refreshToken);
    }

    return true;
  }
}
