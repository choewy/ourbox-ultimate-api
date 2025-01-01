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
  Cj = 'CJ',
  Lotte = 'LOTTE',
  Directly = 'DIRECT',
}

export enum DeliveryCompanyStatus {
  Activated = 'activated',
  Disabled = 'disabled',
}
