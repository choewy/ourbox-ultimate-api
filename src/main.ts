import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthGuard } from './application/module/auth/auth.guard';
import { ApplicationConfigFactory } from './common/config/factory/application-config.factory';
import { ExceptionFilter } from './common/provider/exception.filter';
import { SerializeInterceptor } from './common/provider/serialize.interceptor';
import { ValidationPipe } from './common/provider/validation.pipe';
import { RequestContextInterceptor } from './common/request-context/request-context.interceptor';
import { Swagger } from './common/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const applicationConfigFactory = app.get(ApplicationConfigFactory);

  new Swagger(app).createDocument().createCustomOptions({ accessToken: null, refreshToken: null }).setup();

  app.enableShutdownHooks();
  app.enableCors(applicationConfigFactory.corsOptions);
  app.useGlobalInterceptors(app.get(SerializeInterceptor), app.get(RequestContextInterceptor));
  app.useGlobalFilters(app.get(ExceptionFilter));
  app.useGlobalPipes(app.get(ValidationPipe));
  app.useGlobalGuards(app.get(AuthGuard));

  await app.listen(applicationConfigFactory.port, applicationConfigFactory.host);
}

bootstrap();
