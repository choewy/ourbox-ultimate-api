import { RequestHeader } from '@/constant/enums';

export enum RequestContextPropertyKey {
  RequestId = RequestHeader.RequestId,
  RequestTimestamp = 'request-timestamp',
  RequestUser = 'request-user',
  OriginUser = 'origin-user',
  JwtPaylaod = 'jwt-payload',
  ExecutionContext = 'execution-context',
}
