import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { GetFulfillmentCentersParamDTO } from '@/application/dto/request/get-fulfillment-centers-param.dto';
import { GetFulfillmentsParamDTO } from '@/application/dto/request/get-fulfillments-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateFulfillmentCenterDTO } from '@/application/dto/request/update-fulfillment-center.dto';
import { UpdateFulfillmentDTO } from '@/application/dto/request/update-fulfillment.dto';
import { FulfillmentCentersDTO } from '@/application/dto/response/fulfillment-centers.dto';
import { FulfillmentsDTO } from '@/application/dto/response/fulfillments.dto';
import { ApiException } from '@/common/swagger/decorator';

// TODO 풀필먼트, 풀필먼트 센터 모듈 분리할 것
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

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '풀필먼트 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updateFulfillment(@Param() param: IdParamDTO, @Body() body: UpdateFulfillmentDTO) {
    return this.fulfillmentService.updateFulfillment(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '풀필먼트 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deleteFulfillment(@Param() param: IdParamDTO) {
    return this.fulfillmentService.deleteFulfillment(param.id);
  }

  @Get('centers')
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 목록 조회' })
  @ApiOkResponse({ type: FulfillmentCentersDTO })
  @ApiException()
  async getFulfillmentCenters(@Query() queryParam: GetFulfillmentCentersParamDTO) {
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

  @Patch('centers/:id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updateFulfillmentCenter(@Param() param: IdParamDTO, @Body() body: UpdateFulfillmentCenterDTO) {
    return this.fulfillmentService.updateFulfillmentCenter(param.id, body);
  }

  @Delete('centers/:id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 삭제' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async deleteFulfillmentCenter(@Param() param: IdParamDTO) {
    return this.fulfillmentService.deleteFulfillmentCenter(param.id);
  }
}
