import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { CreateSwaggerCustomOptions } from './types';
import { ApplicationConfigFactory } from '../config/factory/application-config.factory';

import { RequestHeader } from '@/constant/enums';

export class Swagger {
  private readonly documentBuilder: DocumentBuilder;
  private readonly customOptions: SwaggerCustomOptions;

  constructor(private readonly app: INestApplication) {
    this.documentBuilder = new DocumentBuilder();
    this.customOptions = { swaggerOptions: { docExpansion: 'none', authAction: {} } };
  }

  createDocument() {
    const applicationConfigFactory = this.app.get(ApplicationConfigFactory);

    this.documentBuilder
      .setTitle(applicationConfigFactory.name)
      .setVersion(applicationConfigFactory.version)
      .addBearerAuth({ name: RequestHeader.Authorization, type: 'http', in: 'header', scheme: 'bearer' }, RequestHeader.Authorization)
      .addApiKey({ name: RequestHeader.RefreshToken, type: 'apiKey', in: 'header' }, RequestHeader.RefreshToken);

    return this;
  }

  createCustomOptions(options?: CreateSwaggerCustomOptions) {
    this.customOptions.swaggerOptions.authAction[RequestHeader.Authorization] = {
      schema: {
        type: 'http',
        in: 'header',
        schema: 'bearer',
      },
      value: options?.accessToken,
    };

    this.customOptions.swaggerOptions.authAction[RequestHeader.RefreshToken] = {
      schema: {
        type: 'apiKey',
        in: 'header',
      },
      value: options?.refreshToken,
    };

    return this;
  }

  setup(path: string = 'api-docs') {
    SwaggerModule.setup(path, this.app, SwaggerModule.createDocument(this.app, this.documentBuilder.build()), this.customOptions);
  }
}
