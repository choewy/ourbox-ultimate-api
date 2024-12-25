import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PurchaserService } from './purchaser.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePurchaserDTO } from '@/application/dto/request/create-purchaser.dto';
import { GetPurchasersParamDTO } from '@/application/dto/request/get-purchasers-param.dto';
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
  async getConsginers(@Query() queryParam: GetPurchasersParamDTO) {
    return this.purchaserService.getConsigners(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '매입처 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createConsigner(@Body() body: CreatePurchaserDTO) {
    return this.purchaserService.createConsigner(body);
  }
}
