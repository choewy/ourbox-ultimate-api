import { HttpStatus, ValidationError } from '@nestjs/common';

import { ServiceErrorCode } from './enums';

export class ValidationFailedException {
  readonly message: string;
  readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    this.message = 'ValidationFailed';
    this.errors = errors;
  }
}

export class ServiceErrorException {
  public readonly errorCode: ServiceErrorCode;
  public readonly statusCode: HttpStatus;
  public readonly message?: string;
  public readonly cause?: unknown;

  constructor(errorCode: ServiceErrorCode, statusCode: HttpStatus, message?: string, cause?: unknown) {
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = message;
    this.cause = cause;
  }
}

export class LoginRequiredException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.LoginRequired, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidTokenException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
  }
}

export class WrongEmailOrPasswordException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.WrongEmailOrPassword, HttpStatus.UNAUTHORIZED);
  }
}

export class InActivatedAccountException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.InActivatedAccount, HttpStatus.FORBIDDEN);
  }
}

export class AccessDeninedException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.AccessDenined, HttpStatus.FORBIDDEN);
  }
}

export class AlreadyExistEmailException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.AlreadyExistUserEmail, HttpStatus.CONFLICT);
  }
}

export class AlreadyExistFulfillmentCenterCodeException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.AlreadyExistFulfillmentCenterCode, HttpStatus.CONFLICT);
  }
}

export class NotFoundPartnerException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundPartner, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}

export class NotFoundPartnerChannelException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundPartnerChannel, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}

export class NotFoundFulfillmentException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundFulfillment, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}

export class NotFoundFulfillmentCenterException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundFulfillmentCenter, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}