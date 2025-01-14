import { Injectable } from '@nestjs/common';

import { DeliveryCompanyCode, UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { DeliveryCompanySettingRepository } from '@/application/domain/repository/delivery-company-setting.repository';
import { DeliveryCompanyRepository } from '@/application/domain/repository/delivery-company.repository';
import { CreateDeliveryCompanySettingDTO } from '@/application/dto/request/create-delivery-company-setting.dto';
import { GetDeliveryCompanySettingsParamDTO } from '@/application/dto/request/get-delivery-company-settings-param.dto';
import { SetCjSettingDTO } from '@/application/dto/request/set-cj-setting.dto copy';
import { SetHanjinSettingDTO } from '@/application/dto/request/set-hanjin-setting.dto';
import { SetLotteSettingDTO } from '@/application/dto/request/set-lotte-setting.dto';
import { SetTeamfreshSettingDTO } from '@/application/dto/request/set-teamfresh-setting.dto';
import { UpdateDeliveryCompanySettingDTO } from '@/application/dto/request/update-delivery-company-setting.dto';
import { DeliveryCompanySettingDTO } from '@/application/dto/response/delivery-company-setting.dto';
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

  async getDeliveryCompanySettings(param: GetDeliveryCompanySettingsParamDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillmentCenterId = requestUser.getFulfillmentCenterId(param.fulfillmentCenterId);

    if (!fulfillmentCenterId) {
      throw new ValidationFailedException('fulfillmentCenterId should not be empty');
    }

    return (await this.deliveryCompanySettingRepository.findManyByFulfillmentCenterId(fulfillmentCenterId)).map(
      (deliveryCompanySetting) => new DeliveryCompanySettingDTO(deliveryCompanySetting),
    );
  }

  private validateDeliveryCompanySetting(code: DeliveryCompanyCode, body: CreateDeliveryCompanySettingDTO | UpdateDeliveryCompanySettingDTO) {
    switch (code) {
      case DeliveryCompanyCode.Hanjin:
      case DeliveryCompanyCode.HanjinToday:
      case DeliveryCompanyCode.HanjinHoliday:
      case DeliveryCompanyCode.HanjinArriavalGuarentee:
        if (body.hanjinSetting instanceof SetHanjinSettingDTO === false) {
          throw new ValidationFailedException('hanjinSetting should not be empty');
        }

        break;

      case DeliveryCompanyCode.Cj:
      case DeliveryCompanyCode.CjOne:
      case DeliveryCompanyCode.CjArriavalGuarentee:
        if (body.cjSetting instanceof SetCjSettingDTO === false) {
          throw new ValidationFailedException('cjSetting should not be empty');
        }

        break;

      case DeliveryCompanyCode.Lotte:
        if (body.lotteSetting instanceof SetLotteSettingDTO === false) {
          throw new ValidationFailedException('lotteSetting should not be empty');
        }

        break;

      case DeliveryCompanyCode.Teamfresh:
        if (body.teamfreshSetting instanceof SetTeamfreshSettingDTO === false) {
          throw new ValidationFailedException('teamfreshSetting should not be empty');
        }

        break;
    }
  }

  async createDeliveryCompanySetting(body: CreateDeliveryCompanySettingDTO) {
    this.validateDeliveryCompanySetting(body.code, body);

    const requestUser = this.requestContextService.getRequestUser<User>();
    const fulfillmentCenterId = requestUser.getFulfillmentCenterId(body.fulfillmentCenterId);

    if ([UserType.Admin, UserType.FulfillmentAdmin].includes(requestUser.type) && !fulfillmentCenterId) {
      throw new ValidationFailedException('fulfillmentCenterId should not be empty');
    }

    const deliveryCompany = await this.deliveryCompanyRepository.findOneByCode(body.code);

    if (!deliveryCompany) {
      throw new NotFoundDeliveryCompanyCodeException(body.code);
    }

    if (await this.deliveryCompanySettingRepository.hasByKey(fulfillmentCenterId, deliveryCompany.id)) {
      throw new AlreadyExistDeliveryCompanySettingException();
    }

    await this.deliveryCompanySettingRepository.insertOne({
      fulfillmentCenterId,
      deliveryCompanyId: deliveryCompany.id,
      zipCode: body.zipCode,
      address: body.address,
      detailAddress: body.detailAddress,
      hanjinSetting: body.hanjinSetting,
      cjSetting: body.cjSetting,
      lotteSetting: body.lotteSetting,
      teamfreshSetting: body.teamfreshSetting,
    });
  }

  async updateDeliveryCompanySetting(id: string, body: UpdateDeliveryCompanySettingDTO) {
    const deliveryCompanySetting = await this.deliveryCompanySettingRepository.findOneById(id);

    if (!deliveryCompanySetting) {
      throw new NotFoundDeliveryCompanySettingException(id);
    }

    const deliveryCompany = deliveryCompanySetting.deliveryCompany;

    if (!deliveryCompany) {
      throw new NotFoundDeliveryCompanyCodeException();
    }

    this.validateDeliveryCompanySetting(deliveryCompany.code, body);

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (
      ![UserType.Admin, UserType.FulfillmentAdmin].includes(requestUser.type) &&
      requestUser.fulfillmentCenterId !== deliveryCompanySetting.fulfillmentCenterId
    ) {
      throw new AccessDeninedException();
    }

    await this.deliveryCompanySettingRepository.updateOne(id, {
      zipCode: body.zipCode && body.zipCode !== deliveryCompanySetting.zipCode ? body.zipCode : undefined,
      address: body.address && body.address !== deliveryCompanySetting.address ? body.address : undefined,
      detailAddress: body.detailAddress && body.detailAddress !== deliveryCompanySetting.detailAddress ? body.detailAddress : undefined,
      hanjinSetting: body.hanjinSetting,
      cjSetting: body.cjSetting,
      lotteSetting: body.lotteSetting,
      teamfreshSetting: body.teamfreshSetting,
    });
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

    await this.deliveryCompanySettingRepository.deleteOne(deliveryCompanySetting.id);
  }
}
