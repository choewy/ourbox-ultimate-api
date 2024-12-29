import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthGuard } from './application/module/auth/auth.guard';
import { AuthService } from './application/module/auth/auth.service';
import { UserTypeGuard } from './application/module/user/user.guard';
import { ApplicationConfigFactory } from './common/config/factory/application-config.factory';
import { ExceptionFilter } from './common/provider/exception.filter';
import { LoggingInterceptor } from './common/provider/logging.interceptor';
import { SerializeInterceptor } from './common/provider/serialize.interceptor';
import { ValidationPipe } from './common/provider/validation.pipe';
import { RequestContextInterceptor } from './common/request-context/request-context.interceptor';
import { Swagger } from './common/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const applicationConfigFactory = app.get(ApplicationConfigFactory);

  const authService = app.get(AuthService);
  const user = await authService.getUser('1');

  new Swagger(app)
    .createDocument()
    .createCustomOptions(user ? authService.issueTokens(user) : {})
    .setup();

  app.enableShutdownHooks();
  app.enableCors(applicationConfigFactory.corsOptions);
  app.useGlobalInterceptors(app.get(SerializeInterceptor), app.get(RequestContextInterceptor), app.get(LoggingInterceptor));
  app.useGlobalFilters(app.get(ExceptionFilter));
  app.useGlobalPipes(app.get(ValidationPipe));
  app.useGlobalGuards(app.get(AuthGuard), app.get(UserTypeGuard));

  await app.listen(applicationConfigFactory.port, applicationConfigFactory.host);
}

bootstrap();
