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

  public get name(): string {
    return this.configService.getOrThrow('npm_package_name');
  }

  public get version(): string {
    return this.configService.getOrThrow('npm_package_version');
  }

  public get port(): number {
    return +this.configService.getOrThrow('PORT');
  }

  public get host(): string {
    return this.configService.getOrThrow('HOST');
  }

  public get domain(): string {
    return this.configService.getOrThrow('DOMAIN');
  }

  public get corsOptions(): CorsOptions {
    return {
      origin: this.configService.getOrThrow('CORS_ORIGIN'),
    };
  }
}
