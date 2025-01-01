import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeliveryCompanySettingService } from './delivery-company-setting.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateDeliveryCompanySettingDTO } from '@/application/dto/request/create-delivery-company-setting.dto';
import { GetDeliveryCompanySettingsParamDTO } from '@/application/dto/request/get-delivery-company-settings-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateDeliveryCompanySettingDTO } from '@/application/dto/request/update-delivery-company-setting.dto';
import { DeliveryCompanySettingDTO } from '@/application/dto/response/delivery-company-setting.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('풀필먼트 센터 택배사 설정')
@RequiredAuth()
@RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser)
@Controller('delivery-copmany-settings')
export class DeliveryCompanySettingController {
  constructor(private readonly deliveryCompanySettingService: DeliveryCompanySettingService) {}

  @Get()
  @ApiOperation({ summary: '풀필먼트 센터 택배사 설정 목록 조회' })
  @ApiOkResponse({ type: [DeliveryCompanySettingDTO] })
  @ApiException()
  async getDeliveryCompanySettings(@Query() queryParam: GetDeliveryCompanySettingsParamDTO) {
    return this.deliveryCompanySettingService.getDeliveryCompanySettings(queryParam);
  }

  @Post()
  @ApiOperation({ summary: '풀필먼트 센터 택배사 설정 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createDeliveryCompanySetting(@Body() body: CreateDeliveryCompanySettingDTO) {
    return this.deliveryCompanySettingService.createDeliveryCompanySetting(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 센터 택배사 설정 변경' })
  @ApiNoContentResponse()
  @ApiException()
  async updateDeliveryCompanySetting(@Param() param: IdParamDTO, @Body() body: UpdateDeliveryCompanySettingDTO) {
    return this.deliveryCompanySettingService.updateDeliveryCompanySetting(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 센터 택배사 설정 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deleteDeliveryCompanySetting(@Param() param: IdParamDTO) {
    return this.deliveryCompanySettingService.deleteDeliveryCompanySetting(param.id);
  }
}
