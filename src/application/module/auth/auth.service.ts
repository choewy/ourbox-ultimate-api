import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

import { UserStatus, UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { UserRepository } from '@/application/domain/repository/user.repository';
import { SignInWithOtherType } from '@/application/dto/enums';
import { SignInWithOtherDTO } from '@/application/dto/request/signin-with-other.dto';
import { SignInDTO } from '@/application/dto/request/signin.dto';
import { AuthDTO } from '@/application/dto/response/auth.dto';
import { JwtDTO } from '@/application/dto/response/jwt.dto';
import { JwtSignPayload, JwtVerifyResult } from '@/application/dto/types';
import { ApplicationConfigFactory } from '@/common/config/factory/application-config.factory';
import { RequestContextService } from '@/common/request-context/request-context.service';
import {
  AccessDeninedException,
  InActivatedAccountException,
  NotFoundUserException,
  ValidationFailedException,
  WrongEmailOrPasswordException,
} from '@/constant/exceptions';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(
    private readonly applicationConfigFactory: ApplicationConfigFactory,
    private readonly requestContextService: RequestContextService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async onApplicationBootstrap() {
    const adminId = '1';
    const admin = await this.userRepository.findOneById(adminId);

    if (admin) {
      return;
    }

    await this.userRepository.insert({
      id: adminId,
      type: UserType.Admin,
      email: 'admin@ultimate.com',
      password: 'password',
      name: '통합관리자',
    });
  }

  async auth() {
    const payload = this.requestContextService.getJwtPayload<JwtSignPayload>();
    const user = this.requestContextService.getRequestUser<User>();
    const originUser = this.requestContextService.getOriginUser<User>();

    return new AuthDTO(payload, user, originUser);
  }

  async signIn(body: SignInDTO) {
    const user = await this.userRepository.findOneByEmail(body.email);

    if (!user || !user.password.compare(body.password)) {
      throw new WrongEmailOrPasswordException();
    }

    if (user.status !== UserStatus.Activated) {
      throw new InActivatedAccountException();
    }

    return this.issueTokens(user);
  }

  async signInWithOther(body: SignInWithOtherDTO) {
    const requestUser = this.requestContextService.getOriginUser<User>() ?? this.requestContextService.getRequestUser<User>();

    if (body.type === SignInWithOtherType.Restore || requestUser.id === body.otherId) {
      return this.issueTokens(requestUser);
    }

    if (![UserType.Admin, UserType.PartnerAdmin, UserType.FulfillmentAdmin].includes(requestUser.type)) {
      throw new AccessDeninedException();
    }

    if (!body.otherId) {
      throw new ValidationFailedException([
        {
          target: body,
          value: body.otherId,
          property: 'otherId',
          children: [],
          constraints: {
            isNotEmpty: 'otherId should not be empty',
          },
        },
      ]);
    }

    const otherUser = await this.userRepository.findOneById(body.otherId);

    if (!otherUser) {
      throw new NotFoundUserException(body.otherId);
    }

    if (otherUser.status !== UserStatus.Activated) {
      throw new InActivatedAccountException();
    }

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        if (requestUser.partnerId !== otherUser.partnerId) {
          throw new AccessDeninedException();
        }

        break;

      case UserType.FulfillmentAdmin:
        if (requestUser.fulfillmentId !== otherUser.fulfillmentId) {
          throw new AccessDeninedException();
        }

        break;
    }

    return this.issueTokens(otherUser, requestUser);
  }

  async getUser(id: string) {
    return this.userRepository.findOneById(id);
  }

  verifyAccessToken(accessToken: string, isExpired: boolean = false): JwtVerifyResult {
    const verifyOptions = this.applicationConfigFactory.jwtConfig.accessToken.verifyOptions;

    verifyOptions.ignoreExpiration = isExpired;

    const verifyResult: JwtVerifyResult = {
      ok: true,
      payload: null,
      error: null,
      isExpired,
    };

    try {
      verifyResult.payload = this.jwtService.verify(accessToken, verifyOptions);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        return this.verifyAccessToken(accessToken, true);
      }

      verifyResult.ok = false;
      verifyResult.error = e;
      verifyResult.isExpired = false;
    }

    return verifyResult;
  }

  verifyRefreshToken(refreshToken: string): JwtVerifyResult {
    const verifyOptions = this.applicationConfigFactory.jwtConfig.refreshToken.verifyOptions;
    const verifyResult: JwtVerifyResult = {
      ok: true,
      payload: null,
      error: null,
    };

    try {
      verifyResult.payload = this.jwtService.verify(refreshToken, verifyOptions);
    } catch (e) {
      verifyResult.ok = false;
      verifyResult.error = e;
    }

    return verifyResult;
  }

  issueTokens(user: User, originUser?: User) {
    const payload: JwtSignPayload = {
      id: user.id,
      originId: originUser?.id ?? null,
    };

    return new JwtDTO(this.issueAccessToken(payload), this.issueRefreshToken(payload));
  }

  private issueAccessToken(payload: JwtSignPayload) {
    return this.jwtService.sign(payload, this.applicationConfigFactory.jwtConfig.accessToken.signOptions);
  }

  private issueRefreshToken(payload: JwtSignPayload) {
    return this.jwtService.sign(payload, this.applicationConfigFactory.jwtConfig.refreshToken.signOptions);
  }
}
