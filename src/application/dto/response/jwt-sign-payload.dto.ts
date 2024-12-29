import { ApiResponseProperty } from '@nestjs/swagger';

import { JwtSignPayload } from '../types';

export class JwtSignPayloadDTO implements JwtSignPayload {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  originId?: string;

  @ApiResponseProperty({ type: Number })
  iat?: number;

  @ApiResponseProperty({ type: Number })
  exp?: number;

  constructor(payload: JwtSignPayload) {
    this.id = payload.id;
    this.originId = payload.originId ?? null;
    this.iat = payload.iat ?? null;
    this.exp = payload.exp ?? null;
  }
}
