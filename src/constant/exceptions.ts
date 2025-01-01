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

export class CannotUseResourceException extends ServiceErrorException {
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

export class NotFoundUserException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundUser, HttpStatus.BAD_REQUEST, undefined, { id });
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

export class NotFoundPurchaserException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundPurchaser, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}

export class NotFoundConsignerException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundConsigner, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}

export class NotFoundProductException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundProduct, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}

export class NotFoundProductsException<T extends { id: string }> extends ServiceErrorException {
  constructor(ids?: T[]) {
    const cause = Array.isArray(ids) ? ids.map(({ id }) => ({ id })) : [];

    super(ServiceErrorCode.NotFoundProduct, HttpStatus.BAD_REQUEST, undefined, cause);
  }
}

export class AlreadyExistDeliveryCompanyCodeException extends ServiceErrorException {
  constructor(code?: string) {
    super(ServiceErrorCode.AlreadyExistDeliveryCompanyCode, HttpStatus.CONFLICT, undefined, { code });
  }
}

export class NotFoundDeliveryCompanyCodeException extends ServiceErrorException {
  constructor(code?: string) {
    super(ServiceErrorCode.AlreadyExistDeliveryCompanyCode, HttpStatus.BAD_REQUEST, undefined, { code });
  }
}

export class AlreadyExistDeliveryCompanySettingException extends ServiceErrorException {
  constructor() {
    super(ServiceErrorCode.AlreadyExistDeliveryCompanySetting, HttpStatus.CONFLICT, undefined);
  }
}

export class NotFoundDeliveryCompanySettingException extends ServiceErrorException {
  constructor(id?: string) {
    super(ServiceErrorCode.NotFoundDeliveryCompanySetting, HttpStatus.BAD_REQUEST, undefined, { id });
  }
}
