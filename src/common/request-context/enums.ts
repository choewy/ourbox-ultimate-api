import { RequestHeader } from '@/constant/enums';

export enum RequestContextPropertyKey {
  RequestId = RequestHeader.RequestId,
  RequestUser = 'request-user',
  ExecutionContext = 'execution-context',
}
