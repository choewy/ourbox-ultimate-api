import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(e: HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const exception = e instanceof HttpException ? e : new InternalServerErrorException(e, { cause: { name: e.name, message: e.message } });
    const exceptionName = Object.getPrototypeOf(e).constructor.name.replace('Exception', '');

    return response.status(exception.getStatus()).send({
      id: request['id'],
      name: exceptionName,
      statusCode: exception.getStatus(),
      message: exception.message,
      cause: exception.cause,
    });
  }
}
