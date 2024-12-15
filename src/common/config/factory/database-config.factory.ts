import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { NodeEnv } from '../enums';

@Injectable()
export class DatabaseConfigFactory {
  constructor(private readonly configService: ConfigService) {}

  public get typeormModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getOrThrow('DB_HOST'),
      port: +this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_DATABASE'),
      synchronize: this.configService.get('NODE_ENV') === NodeEnv.Local && this.configService.get('DB_SYNCHRONIZE') === 'true',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [`${process.cwd()}/dist/**/*.entity.{ts,js}`],
    };
  }
}
