import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentCenterService } from './fulfillment-center.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { GetFulfillmentCentersParamDTO } from '@/application/dto/request/get-fulfillment-centers-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateFulfillmentCenterDTO } from '@/application/dto/request/update-fulfillment-center.dto';
import { FulfillmentCentersDTO } from '@/application/dto/response/fulfillment-centers.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('풀필먼트 센터')
@RequiredAuth()
@Controller('fulfillment-centers')
export class FulfillmentCenterController {
  constructor(private readonly fulfillmentCenterService: FulfillmentCenterService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 목록 조회' })
  @ApiOkResponse({ type: FulfillmentCentersDTO })
  @ApiException()
  async getFulfillmentCenters(@Query() queryParam: GetFulfillmentCentersParamDTO) {
    return this.fulfillmentCenterService.getFulfillmentCenters(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 등록' })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.CONFLICT)
  async createFulfillmentCenter(@Body() body: CreateFulfillmentCenterDTO) {
    return this.fulfillmentCenterService.createFulfillmentCenter(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updateFulfillmentCenter(@Param() param: IdParamDTO, @Body() body: UpdateFulfillmentCenterDTO) {
    return this.fulfillmentCenterService.updateFulfillmentCenter(param.id, body);
  }

  @Delete('centers/:id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 삭제' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async deleteFulfillmentCenter(@Param() param: IdParamDTO) {
    return this.fulfillmentCenterService.deleteFulfillmentCenter(param.id);
  }
}
