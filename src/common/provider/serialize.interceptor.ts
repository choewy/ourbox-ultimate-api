import { ClassSerializerInterceptor, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SerializeInterceptor extends ClassSerializerInterceptor {
  constructor(reflector: Reflector) {
    super(reflector, {
      enableCircularCheck: true,
      enableImplicitConversion: true,
    });
  }
}
