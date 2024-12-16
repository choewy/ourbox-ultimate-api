import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiSecurity } from '@nestjs/swagger';

import { RequestHeader, ResponseHeader } from '@/constant/enums';

export const REQUIRED_AUTH = 'required-auth';
export const RequiredAuth = () =>
  applyDecorators(
    SetMetadata(REQUIRED_AUTH, true),
    ApiBearerAuth(RequestHeader.Authorization),
    ApiSecurity(RequestHeader.RefreshToken),
    ApiResponse({
      headers: {
        [ResponseHeader.RequestId]: { description: '요청 ID', schema: { type: 'string' } },
        [ResponseHeader.AccessToken]: { description: '갱신된 AccessToken', schema: { type: 'string' } },
        [ResponseHeader.RefreshToken]: { description: '갱신된 RefreshToken', schema: { type: 'string' } },
      },
    }),
  );
