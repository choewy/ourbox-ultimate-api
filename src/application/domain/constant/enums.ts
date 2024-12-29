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
