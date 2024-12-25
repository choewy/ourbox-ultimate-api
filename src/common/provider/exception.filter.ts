import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { ExceptionDTO } from '@/constant/dto/exception.dto';
import { ServiceErrorException, ValidationFailedException } from '@/constant/exceptions';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(e: HttpException | ValidationFailedException | ServiceErrorException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    let exceptionDTO: ExceptionDTO;

    switch (true) {
      case e instanceof ServiceErrorException:
        exceptionDTO = ExceptionDTO.ofServiceErrorException(request, e);
        break;

      case e instanceof ValidationFailedException:
        exceptionDTO = ExceptionDTO.ofValidationFailedException(request, e);
        break;

      case e instanceof HttpException:
        exceptionDTO = ExceptionDTO.ofHttpException(request, e);
        break;

      default:
        exceptionDTO = ExceptionDTO.ofError(request, e);
        break;
    }

    return response.status(exceptionDTO.statusCode).send(exceptionDTO);
  }
}
