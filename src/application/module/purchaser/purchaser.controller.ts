import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PurchaserService } from './purchaser.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePurchaserDTO } from '@/application/dto/request/create-purchaser.dto';
import { GetPurchasersParamDTO } from '@/application/dto/request/get-purchasers-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdatePurchaserDTO } from '@/application/dto/request/update-purchaser.dto';
import { PurchasersDTO } from '@/application/dto/response/purchasers.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('매입처')
@RequiredAuth()
@Controller('purchasers')
export class PurchaserController {
  constructor(private readonly purchaserService: PurchaserService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '매입처 목록 조회' })
  @ApiOkResponse({ type: PurchasersDTO })
  @ApiException()
  async getPurchasers(@Query() queryParam: GetPurchasersParamDTO) {
    return this.purchaserService.getPurchasers(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '매입처 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createPurchaser(@Body() body: CreatePurchaserDTO) {
    return this.purchaserService.createPurchaser(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '매입처 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updatePurchaser(@Param() param: IdParamDTO, @Body() body: UpdatePurchaserDTO) {
    return this.purchaserService.updatePurchaser(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '매입처 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deletePurchaser(@Param() param: IdParamDTO) {
    return this.purchaserService.deletePurchaser(param.id);
  }
}
