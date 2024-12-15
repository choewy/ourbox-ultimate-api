import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DataSourceName, NodeEnv } from '../enums';
import { ApplicationJwtConfig } from '../types';

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

  public get typeormModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: DataSourceName.Application,
      host: this.configService.getOrThrow('DB_HOST'),
      port: +this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_DATABASE'),
      synchronize: this.configService.get('NODE_ENV') === NodeEnv.Local && this.configService.get('DB_SYNCHRONIZE') === 'true',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [`${process.cwd()}/dist/application/domain/entity/**/*.entity.{ts,js}`],
      logging: true,
    };
  }

  public get jwtConfig(): ApplicationJwtConfig {
    const suffix = [this.name, this.domain].join(':');
    return {
      accessToken: {
        signOptions: {
          secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
          subject: [suffix, 'access-token'].join(':'),
          issuer: [suffix, 'server'].join(':'),
          audience: [suffix, 'user'].join(':'),
          expiresIn: '3s',
        },
        verifyOptions: {
          secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
          subject: [suffix, 'access-token'].join(':'),
          issuer: [suffix, 'server'].join(':'),
          audience: [suffix, 'user'].join(':'),
        },
      },
      refreshToken: {
        signOptions: {
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          subject: [suffix, 'refresh-token'].join(':'),
          issuer: [suffix, 'server'].join(':'),
          audience: [suffix, 'user'].join(':'),
          expiresIn: '1m',
        },
        verifyOptions: {
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          subject: [suffix, 'refresh-token'].join(':'),
          issuer: [suffix, 'server'].join(':'),
          audience: [suffix, 'user'].join(':'),
        },
      },
    };
  }
}
