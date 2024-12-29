import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

import { RequestContextPropertyKey } from './enums';

import { RequestHeader } from '@/constant/enums';

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

  getRequestLatency(): number {
    const requestTimestamp = this.clsService.get(RequestContextPropertyKey.RequestTimestamp) ?? 0;

    if (requestTimestamp === 0) {
      return 0;
    }

    return (Date.now() - requestTimestamp) / 1000;
  }

  getRequestInformation(exception?: unknown) {
    const request = this.getRequest();

    if (!request) {
      return null;
    }

    const requestInformation: Record<string, unknown> = {
      id: this.getRequestId(),
      ip: request.headers[RequestHeader.ForwarededFor] ?? request.ip,
      method: request.method,
      path: request.path + (Object.values(request.params).length > 0 ? `/${Object.values(request.params)}` : ''),
    };

    if (Object.keys(request.query).length > 0) {
      requestInformation.query = request.query;
    }

    if (exception) {
      requestInformation.exception = exception;
    }

    if (this.getJwtPayload()) {
      requestInformation.auth = this.getJwtPayload();
    }

    requestInformation.latency = this.getRequestLatency();

    return requestInformation;
  }

  getExecutionContext(): ExecutionContext {
    return this.clsService.get(RequestContextPropertyKey.ExecutionContext) ?? null;
  }

  getRequestUser<User = any>(): User {
    return this.clsService.get(RequestContextPropertyKey.RequestUser) ?? null;
  }

  getOriginUser<User = any>(): User {
    return this.clsService.get(RequestContextPropertyKey.OriginUser) ?? null;
  }

  getJwtPayload<JwtSignPayload = any>(): JwtSignPayload {
    return this.clsService.get(RequestContextPropertyKey.JwtPaylaod) ?? null;
  }

  setExecutionContext(executionContext: ExecutionContext) {
    this.clsService.set(RequestContextPropertyKey.ExecutionContext, executionContext);
  }

  setRequestUser<User = any>(user: User) {
    this.clsService.set(RequestContextPropertyKey.RequestUser, user);
  }

  setOriginUser<User = any>(user: User) {
    this.clsService.set(RequestContextPropertyKey.OriginUser, user);
  }

  setJwtPayload<JwtSignPayload = any>(payload: JwtSignPayload) {
    this.clsService.set(RequestContextPropertyKey.JwtPaylaod, payload);
  }
}
