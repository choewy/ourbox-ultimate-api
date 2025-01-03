import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { GetFulfillmentsParamDTO } from '@/application/dto/request/get-fulfillments-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateFulfillmentDTO } from '@/application/dto/request/update-fulfillment.dto';
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
}
