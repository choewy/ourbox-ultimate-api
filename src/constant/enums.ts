export enum RequestHeader {
  RequestId = 'x-request-id',
  Authorization = 'authorization',
  RefreshToken = 'x-refresh-token',
}

export enum ResponseHeader {
  RequestId = 'x-request-id',
  AccessToken = 'x-access-token',
  RefreshToken = 'x-refresh-token',
}

export enum ServiceErrorCode {
  UnknownError = '000',
  SystemError = '001',
  ValidationError = '002',
  LoginRequired = '100',
  InvalidToken = '101',
  WrongEmailOrPassword = '102',
  InActivatedAccount = '103',
  AccessDenined = '104',
  AlreadyExistUserEmail = '200',
  NotFoundUser = '201',
  NotFoundPartner = '300',
  NotFoundPartnerChannel = '301',
  AlreadyExistFulfillmentCenter = '400',
  NotFoundFulfillment = '401',
  NotFoundFulfillmentCenter = '402',
}
