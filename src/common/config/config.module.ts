import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationConfigFactory } from './factory/application-config.factory';
import { DatabaseConfigFactory } from './factory/database-config.factory';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ApplicationConfigFactory, DatabaseConfigFactory],
  exports: [ApplicationConfigFactory, DatabaseConfigFactory],
})
export class ConfigFactoryModule {}
