import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseConfigFactory } from './provider/database.config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DatabaseConfigFactory],
  exports: [DatabaseConfigFactory],
})
export class ConfigFactoryModule {}
