import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { RequestContextPropertyKey } from './enums';
import { RequestContextInterceptor } from './request-context.interceptor';
import { RequestContextService } from './request-context.service';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup(clsService, req, res) {
          req.id = req.get(RequestContextPropertyKey.RequestId) ?? v4();
          res.set(RequestContextPropertyKey.RequestId, req.id);
          clsService.set(RequestContextPropertyKey.RequestId, req.id);
        },
      },
    }),
  ],
  providers: [RequestContextService, RequestContextInterceptor],
  exports: [RequestContextService, RequestContextInterceptor],
})
export class RequestContextModule {}
