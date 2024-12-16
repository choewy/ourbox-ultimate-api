import { Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

import { VerifyJwtResult } from './types';

import { UserRepository } from '@/application/domain/repository/user.repository';
import { ApplicationConfigFactory } from '@/common/config/factory/application-config.factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly applicationConfigFactory: ApplicationConfigFactory,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: string) {
    return this.userRepository.findOneById(id);
  }

  verifyAccessToken(accessToken: string, isExpired: boolean = false): VerifyJwtResult {
    const verifyOptions = this.applicationConfigFactory.jwtConfig.accessToken.verifyOptions;

    verifyOptions.ignoreExpiration = isExpired;

    const verifyResult: VerifyJwtResult = {
      ok: true,
      id: null,
      error: null,
      isExpired,
    };

    try {
      verifyResult.id = this.jwtService.verify(accessToken, verifyOptions)?.id;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        return this.verifyAccessToken(accessToken, true);
      }

      verifyResult.ok = false;
      verifyResult.id = null;
      verifyResult.error = e;
      verifyResult.isExpired = false;
    }

    return verifyResult;
  }

  verifyRefreshToken(refreshToken: string): VerifyJwtResult {
    const verifyOptions = this.applicationConfigFactory.jwtConfig.refreshToken.verifyOptions;
    const verifyResult: VerifyJwtResult = {
      ok: true,
      id: null,
      error: null,
    };

    try {
      verifyResult.id = this.jwtService.verify(refreshToken, verifyOptions)?.id;
    } catch (e) {
      verifyResult.ok = false;
      verifyResult.id = null;
      verifyResult.error = e;
    }

    return verifyResult;
  }

  issueAccessToken(id: string) {
    return this.jwtService.sign({ id }, this.applicationConfigFactory.jwtConfig.accessToken.signOptions);
  }

  issueRefreshToken(id: string) {
    return this.jwtService.sign({ id }, this.applicationConfigFactory.jwtConfig.refreshToken.signOptions);
  }
}
