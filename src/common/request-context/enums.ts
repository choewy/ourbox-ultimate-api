import { RequestHeader } from '@/constant/enums';

export enum RequestContextPropertyKey {
  RequestId = RequestHeader.RequestId,
  ExecutionContext = 'execution-context',
}
