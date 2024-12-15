import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExceptionFilter } from './common/provider/exception.filter';
import { SerializeInterceptor } from './common/provider/serialize.interceptor';
import { ValidationPipe } from './common/provider/validation.pipe';
import { RequestContextModule } from './common/request-context/request-context.module';
import { ConfigFactoryModule } from './config/config.module';
import { DatabaseConfigFactory } from './config/provider/database.config';

@Module({
  imports: [
    ConfigFactoryModule,
    RequestContextModule,
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfigFactory],
      useFactory(config: DatabaseConfigFactory) {
        return config.typeormModuleOptions;
      },
    }),
  ],
  controllers: [AppController],
  providers: [SerializeInterceptor, ValidationPipe, ExceptionFilter, AppService],
})
export class AppModule {}
