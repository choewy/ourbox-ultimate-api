import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

import { RequestContextPropertyKey } from './enums';

@Injectable()
export class RequestContextService {
  constructor(private readonly clsService: ClsService) {}

  getRequest(): Request {
    const executionContext = this.getExecutionContext();

    if (executionContext === null) {
      return null;
    }

    return executionContext.switchToHttp().getRequest();
  }

  getResponse(): Response {
    const executionContext = this.getExecutionContext();

    if (executionContext === null) {
      return null;
    }

    return executionContext.switchToHttp().getResponse();
  }

  getRequestId(): string {
    return this.clsService.get(RequestContextPropertyKey.RequestId);
  }

  getExecutionContext(): ExecutionContext {
    return this.clsService.get(RequestContextPropertyKey.ExecutionContext) ?? null;
  }

  getRequestUser<User = any>(): User {
    return this.clsService.get(RequestContextPropertyKey.RequestUser) ?? null;
  }

  setExecutionContext(executionContext: ExecutionContext) {
    this.clsService.set(RequestContextPropertyKey.ExecutionContext, executionContext);
  }

  setRequestUser<User = any>(user: User) {
    this.clsService.set(RequestContextPropertyKey.RequestUser, user);
  }
}
