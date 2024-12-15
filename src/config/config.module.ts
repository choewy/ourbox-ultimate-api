import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationConfigFactory } from './provider/application.config';
import { DatabaseConfigFactory } from './provider/database.config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ApplicationConfigFactory, DatabaseConfigFactory],
  exports: [ApplicationConfigFactory, DatabaseConfigFactory],
})
export class ConfigFactoryModule {}
