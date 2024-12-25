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
