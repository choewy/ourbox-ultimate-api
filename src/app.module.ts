import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { ConfigFactoryModule } from './common/config/config.module';
import { ApplicationConfigFactory } from './common/config/factory/application-config.factory';
import { ExceptionFilter } from './common/provider/exception.filter';
import { SerializeInterceptor } from './common/provider/serialize.interceptor';
import { ValidationPipe } from './common/provider/validation.pipe';
import { RequestContextModule } from './common/request-context/request-context.module';

@Module({
  imports: [
    ConfigFactoryModule,
    RequestContextModule,
    TypeOrmModule.forRootAsync({
      inject: [ApplicationConfigFactory],
      useFactory(config: ApplicationConfigFactory) {
        return config.typeormModuleOptions;
      },
    }),
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [SerializeInterceptor, ValidationPipe, ExceptionFilter, AppService],
})
export class AppModule {}
