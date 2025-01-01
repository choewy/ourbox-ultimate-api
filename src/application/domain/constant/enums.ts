export enum UserType {
  Admin = 'admin',
  PartnerAdmin = 'partner-admin',
  PartnerUser = 'partner-user',
  FulfillmentAdmin = 'fulfillment-admin',
  FulfillmentUser = 'fulfillment-user',
}

export enum UserStatus {
  Activated = 'activated',
  Disabled = 'disabled',
}

export enum ProductType {
  Single = 'single',
  Combo = 'combo',
}

export enum ProductUnit {
  Each = 'ea',
  Case = 'cs',
  Package = 'pkg',
}

export enum HistoryAction {
  Insert = 'insert',
  Update = 'update',
  Delete = 'delete',
}

export enum OrderStatus {
  Created = 'created',
  Completed = 'completed',
  Holded = 'holded',
  Canceled = 'canceled',
}

export enum OrderClaimType {
  Return = 'return',
  Exchange = 'exchange',
  Cancel = 'cancel',
}

export enum OrderClaimStatus {
  Wating = 'wating',
  Collecting = 'collecting',
  Collected = 'collected',
  Completed = 'completed',
}

export enum DeliveryCompanyCode {
  Hanjin = 'HJ',
  HanjinToday = 'HJ_today',
  HanjinHoliday = 'HJ_holiday',
  HanjinArriavalGuarentee = 'HJ_arrival_guarantee',
  Cj = 'CJ',
  CjOne = 'CJ_one',
  CjArriavalGuarentee = 'CJ_arrival_guarantee',
  Lotte = 'LOTTE',
  Teamfresh = 'TEAMFRESH',
  Directly = 'DIRECTLY',
}

export enum DeliveryCompanyStatus {
  Activated = 'activated',
  Disabled = 'disabled',
}
