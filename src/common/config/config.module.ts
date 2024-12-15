import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationConfigFactory } from './factory/application-config.factory';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ApplicationConfigFactory],
  exports: [ApplicationConfigFactory],
})
export class ConfigFactoryModule {}
