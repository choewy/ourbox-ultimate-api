import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Request } from 'express';

import { ServiceErrorCode } from '../enums';
import { ServiceErrorException, ValidationFailedException } from '../exceptions';

export class ExceptionDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Number, enum: HttpStatus })
  statusCode: HttpStatus;

  @ApiResponseProperty({ type: String, enum: ServiceErrorCode })
  errorCode: ServiceErrorCode;

  @ApiResponseProperty({ type: String })
  message?: string;

  @ApiResponseProperty({ type: Object })
  cause?: unknown;

  constructor(request: Request) {
    this.id = request['id'];
  }

  public static ofServiceErrorException(request: Request, e: ServiceErrorException) {
    const exceptionDTO = new ExceptionDTO(request);

    exceptionDTO.name = Object.getPrototypeOf(e).constructor.name.replace('Exception', '');
    exceptionDTO.statusCode = e.statusCode;
    exceptionDTO.errorCode = e.errorCode;
    exceptionDTO.message = e.message;
    exceptionDTO.cause = e.cause;

    return exceptionDTO;
  }

  public static ofValidationFailedException(request: Request, e: ValidationFailedException) {
    const exceptionDTO = new ExceptionDTO(request);

    exceptionDTO.name = Object.getPrototypeOf(e).constructor.name.replace('Exception', '');
    exceptionDTO.statusCode = e.statusCode;
    exceptionDTO.errorCode = e.errorCode;
    exceptionDTO.message = e.message;

    return exceptionDTO;
  }

  public static ofHttpException(request: Request, e: HttpException) {
    const exceptionDTO = new ExceptionDTO(request);

    exceptionDTO.name = Object.getPrototypeOf(e).constructor.name.replace('Exception', '');
    exceptionDTO.statusCode = e.getStatus();
    exceptionDTO.errorCode = ServiceErrorCode.UnknownError;
    exceptionDTO.message = e.message;
    exceptionDTO.cause = e.cause;

    return exceptionDTO;
  }

  public static ofError(request: Request, e: Error) {
    const exception = new InternalServerErrorException(e, {
      cause: { name: e.name, message: e.message },
    });

    const exceptionDTO = new ExceptionDTO(request);

    exceptionDTO.name = Object.getPrototypeOf(e).constructor.name.replace('Exception', '');
    exceptionDTO.statusCode = exception.getStatus();
    exceptionDTO.errorCode = ServiceErrorCode.SystemError;
    exceptionDTO.message = exception.message;
    exceptionDTO.cause = exception.cause;

    return exceptionDTO;
  }
}
