import { Injectable } from '@nestjs/common';

import { DeliveryCompanyCode, UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { DeliveryCompanySettingRepository } from '@/application/domain/repository/delivery-company-setting.repository';
import { DeliveryCompanyRepository } from '@/application/domain/repository/delivery-company.repository';
import { CreateDeliveryCompanySettingDTO } from '@/application/dto/request/create-delivery-company-setting.dto';
import { SetCjSettingDTO } from '@/application/dto/request/set-cj-setting.dto copy';
import { SetHanjinSettingDTO } from '@/application/dto/request/set-hanjin-setting.dto';
import { SetLotteSettingDTO } from '@/application/dto/request/set-lotte-setting.dto';
import { SetTeamfreshSettingDTO } from '@/application/dto/request/set-teamfresh-setting.dto';
import { UpdateDeliveryCompanySettingDTO } from '@/application/dto/request/update-delivery-company-setting.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import {
  AccessDeninedException,
  AlreadyExistDeliveryCompanySettingException,
  NotFoundDeliveryCompanyCodeException,
  NotFoundDeliveryCompanySettingException,
  ValidationFailedException,
} from '@/constant/exceptions';

@Injectable()
export class DeliveryCompanySettingService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly deliveryCompanyRepository: DeliveryCompanyRepository,
    private readonly deliveryCompanySettingRepository: DeliveryCompanySettingRepository,
  ) {}

  // TODO
  async getDeliveryCompanySettings() {
    return;
  }

  async createDeliveryCompanySetting(body: CreateDeliveryCompanySettingDTO) {
    switch (body.code) {
      case DeliveryCompanyCode.Hanjin:
      case DeliveryCompanyCode.HanjinToday:
      case DeliveryCompanyCode.HanjinHoliday:
      case DeliveryCompanyCode.HanjinArriavalGuarentee:
        if (body.hanjin instanceof SetHanjinSettingDTO === false) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.hanjin,
              property: 'hanjin',
              children: [],
              constraints: {
                isNotEmpty: 'hanjin should not be empty',
              },
            },
          ]);
        }

        break;

      case DeliveryCompanyCode.Cj:
      case DeliveryCompanyCode.CjOne:
      case DeliveryCompanyCode.CjArriavalGuarentee:
        if (body.cj instanceof SetCjSettingDTO === false) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.cj,
              property: 'cj',
              children: [],
              constraints: {
                isNotEmpty: 'cj should not be empty',
              },
            },
          ]);
        }

        break;

      case DeliveryCompanyCode.Lotte:
        if (body.lotte instanceof SetLotteSettingDTO === false) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.lotte,
              property: 'lotte',
              children: [],
              constraints: {
                isNotEmpty: 'lotte should not be empty',
              },
            },
          ]);
        }

        break;

      case DeliveryCompanyCode.Teamfresh:
        if (body.teamfresh instanceof SetTeamfreshSettingDTO === false) {
          throw new ValidationFailedException([
            {
              target: body,
              value: body.teamfresh,
              property: 'teamfresh',
              children: [],
              constraints: {
                isNotEmpty: 'teamfresh should not be empty',
              },
            },
          ]);
        }

        break;
    }

    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillmentCenterId = requestUser.getFulfillmentCenterId(body.fulfillmentCenterId);

    if ([UserType.Admin, UserType.FulfillmentAdmin].includes(requestUser.type) && !fulfillmentCenterId) {
      throw new ValidationFailedException([
        {
          target: body,
          value: fulfillmentCenterId,
          property: 'fulfillmentCenterId',
          children: [],
          constraints: {
            isNotEmpty: 'fulfillmentCenterId should not be empty',
          },
        },
      ]);
    }

    const deliveryCompany = await this.deliveryCompanyRepository.findOneByCode(body.code);

    if (!deliveryCompany) {
      throw new NotFoundDeliveryCompanyCodeException(body.code);
    }

    if (await this.deliveryCompanySettingRepository.hasByKey(fulfillmentCenterId, deliveryCompany.id)) {
      throw new AlreadyExistDeliveryCompanySettingException();
    }

    await this.deliveryCompanySettingRepository.save({
      fulfillmentCenterId,
      deliveryCompanyId: deliveryCompany.id,
      hanjinSetting: body.hanjin,
      cjSetting: body.cj,
      lotteSetting: body.lotte,
      teamfreshSetting: body.teamfresh,
    });
  }

  async updateDeliveryCompanySetting(id: string, body: UpdateDeliveryCompanySettingDTO) {
    const deliveryCompanySetting = await this.deliveryCompanySettingRepository.findOneById(id);

    if (!deliveryCompanySetting) {
      throw new NotFoundDeliveryCompanySettingException(id);
    }

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (
      ![UserType.Admin, UserType.FulfillmentAdmin].includes(requestUser.type) &&
      requestUser.fulfillmentCenterId !== deliveryCompanySetting.fulfillmentCenterId
    ) {
      throw new AccessDeninedException();
    }

    // TODO update
    return body;
  }

  async deleteDeliveryCompanySetting(id: string) {
    const deliveryCompanySetting = await this.deliveryCompanySettingRepository.findOneById(id);

    if (!deliveryCompanySetting) {
      throw new NotFoundDeliveryCompanySettingException(id);
    }

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (
      ![UserType.Admin, UserType.FulfillmentAdmin].includes(requestUser.type) &&
      requestUser.fulfillmentCenterId !== deliveryCompanySetting.fulfillmentCenterId
    ) {
      throw new AccessDeninedException();
    }

    await this.deliveryCompanySettingRepository.softDelete(deliveryCompanySetting);
  }
}
