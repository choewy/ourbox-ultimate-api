import { Injectable, ValidationPipe as NestValidationPipe } from '@nestjs/common';

import { ValidationFailedException } from '@/constant/exceptions';

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
        const error = errors.shift();
        const message = Object.values(error.constraints).shift();

        return new ValidationFailedException(message);
      },
    });
  }
}
