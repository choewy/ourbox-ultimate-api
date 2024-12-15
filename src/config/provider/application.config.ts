import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '../enums';

@Injectable()
export class ApplicationConfigFactory {
  constructor(private readonly configService: ConfigService) {}

  public get nodeEnv(): NodeEnv {
    return this.configService.getOrThrow('NODE_ENV');
  }

  public get port() {
    return +this.configService.getOrThrow('PORT');
  }

  public get host() {
    return this.configService.getOrThrow('HOST');
  }

  public get domain() {
    return this.configService.getOrThrow('DOMAIN');
  }

  public get corsOptions(): CorsOptions {
    return {
      origin: this.configService.getOrThrow('CORS_ORIGIN'),
    };
  }
}
