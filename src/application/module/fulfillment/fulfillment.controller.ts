import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { GetFulfillmentCentersParamDTO } from '@/application/dto/request/get-fulfillment-centers-param.dto';
import { GetFulfillmentsParamDTO } from '@/application/dto/request/get-fulfillments-param.dto';
import { FulfillmentCentersDTO } from '@/application/dto/response/fulfillment-centers.dto';
import { FulfillmentsDTO } from '@/application/dto/response/fulfillments.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('풀필먼트')
@RequiredAuth()
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '풀필먼트 목록 조회' })
  @ApiOkResponse({ type: FulfillmentsDTO })
  @ApiException()
  async getPartners(@Query() queryParam: GetFulfillmentsParamDTO) {
    return this.fulfillmentService.getFulfillments(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '풀필먼트 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createFulfillment(@Body() body: CreateFulfillmentDTO) {
    return this.fulfillmentService.createFulfillment(body);
  }

  @Get('channels')
  @RequiredUserTypes(UserType.Admin, UserType.PartnerUser)
  @ApiOperation({ summary: '풀필먼트 센터 목록 조회' })
  @ApiOkResponse({ type: FulfillmentCentersDTO })
  @ApiException()
  async getPartnerChannels(@Query() queryParam: GetFulfillmentCentersParamDTO) {
    return this.fulfillmentService.getFulfillmentCenters(queryParam);
  }

  @Post('centers')
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 등록' })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.CONFLICT)
  async createFulfillmentCenter(@Body() body: CreateFulfillmentCenterDTO) {
    return this.fulfillmentService.createFulfillmentCenter(body);
  }

  // TODO update
  // TODO delete one
  // TODO delete many
}
