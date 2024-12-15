import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ExceptionFilter } from './common/provider/exception.filter';
import { SerializeInterceptor } from './common/provider/serialize.interceptor';
import { ValidationPipe } from './common/provider/validation.pipe';
import { RequestContextInterceptor } from './common/request-context/request-context.interceptor';
import { ApplicationConfigFactory } from './config/provider/application.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const applicationConfigFactory = app.get(ApplicationConfigFactory);

  app.enableShutdownHooks();
  app.enableCors(applicationConfigFactory.corsOptions);
  app.useGlobalInterceptors(app.get(SerializeInterceptor), app.get(RequestContextInterceptor));
  app.useGlobalFilters(app.get(ExceptionFilter));
  app.useGlobalPipes(app.get(ValidationPipe));

  await app.listen(applicationConfigFactory.port, applicationConfigFactory.host);
}

bootstrap();
