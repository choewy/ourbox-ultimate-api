import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeliveryCompanySettingService } from './delivery-company-setting.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';

@ApiTags('풀필먼트 센터 택배사 설정')
@RequiredAuth()
@RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser)
@Controller('delivery-copmany-settings')
export class DeliveryCompanySettingController {
  constructor(private readonly deliveryCompanySettingService: DeliveryCompanySettingService) {}
}
