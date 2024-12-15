import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigFactoryModule } from './config/config.module';
import { DatabaseConfigFactory } from './config/provider/database.config';

@Module({
  imports: [
    ConfigFactoryModule,
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfigFactory],
      useFactory(config: DatabaseConfigFactory) {
        return config.typeormModuleOptions;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
