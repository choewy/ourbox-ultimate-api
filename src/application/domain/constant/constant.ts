import { DeliveryCompanyCode, UserType } from './enums';
import { DeliveryCompanyEntity } from './interfaces';

export const EDITABLE_USER_TYPES = [UserType.PartnerAdmin, UserType.PartnerUser, UserType.FulfillmentAdmin, UserType.FulfillmentUser] as const;
export const DELIVERY_COMPANIES: DeliveryCompanyEntity[] = [
  {
    code: DeliveryCompanyCode.Directly,
    name: '직배송',
  },
  {
    code: DeliveryCompanyCode.Hanjin,
    name: '한진택배',
  },
  {
    code: DeliveryCompanyCode.HanjinToday,
    name: '한진택배(당일배송)',
  },
  {
    code: DeliveryCompanyCode.HanjinHoliday,
    name: '한진택배(휴일배송)',
  },
  {
    code: DeliveryCompanyCode.HanjinArriavalGuarentee,
    name: '한진택배(도착보장)',
  },
  {
    code: DeliveryCompanyCode.Cj,
    name: 'CJ대한통운',
  },
  {
    code: DeliveryCompanyCode.CjOne,
    name: 'CJ대한통운(O-NE)',
  },
  {
    code: DeliveryCompanyCode.CjArriavalGuarentee,
    name: 'CJ대한통운(도착보장)',
  },
  {
    code: DeliveryCompanyCode.Lotte,
    name: '롯데택배',
  },
];
