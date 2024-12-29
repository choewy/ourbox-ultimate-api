import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { RequestContextService } from '../request-context/request-context.service';

import { ExceptionDTO } from '@/constant/dto/exception.dto';
import { ServiceErrorException, ValidationFailedException } from '@/constant/exceptions';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  constructor(private readonly requestContextService: RequestContextService) {}

  catch(e: HttpException | ValidationFailedException | ServiceErrorException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    let exceptionDTO: ExceptionDTO;

    switch (true) {
      case e instanceof ServiceErrorException:
        exceptionDTO = ExceptionDTO.ofServiceErrorException(request, e);
        Logger.warn(JSON.stringify(this.requestContextService.getRequestInformation(exceptionDTO), null, 2));

        break;

      case e instanceof ValidationFailedException:
        exceptionDTO = ExceptionDTO.ofValidationFailedException(request, e);
        Logger.warn(JSON.stringify(this.requestContextService.getRequestInformation(exceptionDTO), null, 2));

        break;

      case e instanceof HttpException:
        exceptionDTO = ExceptionDTO.ofHttpException(request, e);
        Logger.warn(JSON.stringify(this.requestContextService.getRequestInformation(exceptionDTO), null, 2));

        break;

      default:
        exceptionDTO = ExceptionDTO.ofError(request, e);
        Logger.error(JSON.stringify(this.requestContextService.getRequestInformation(exceptionDTO), null, 2), e.stack);

        break;
    }

    return response.status(exceptionDTO.statusCode).send(exceptionDTO);
  }
}
