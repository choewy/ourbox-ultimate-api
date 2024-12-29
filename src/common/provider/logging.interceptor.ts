import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

import { RequestContextService } from '../request-context/request-context.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly requestContextService: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    this.requestContextService.setExecutionContext(context);

    return next.handle().pipe(tap(() => Logger.verbose(JSON.stringify(this.requestContextService.getRequestInformation(), null, 2))));
  }
}
