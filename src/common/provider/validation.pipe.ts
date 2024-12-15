import { BadRequestException, Injectable, ValidationPipe as NestValidationPipe, ValidationError } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super();

    this.name = ValidationException.name;
    this.cause = errors;
  }
}

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      exceptionFactory(errors) {
        return new ValidationException(errors);
      },
    });
  }
}
