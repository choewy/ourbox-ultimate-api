import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ExceptionDTO } from '@/constant/dto/exception.dto';

export const ApiException = (...statusCodes: HttpStatus[]) => {
  if (!Array.isArray(statusCodes)) {
    return ApiResponse({ type: ExceptionDTO });
  }

  const decorators: MethodDecorator[] = [];

  for (const statusCode of statusCodes) {
    decorators.push(ApiResponse({ status: statusCode, type: ExceptionDTO }));
  }

  return applyDecorators(...decorators);
};
