import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateFulfillmentCenterDTO } from '@/application/dto/request/create-fulfillment-center.dto';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';
import { ApiException } from '@/common/swagger/decorator';
import { createOperationDescription } from '@/common/swagger/helper';

@ApiTags('풀필먼트')
@RequiredAuth()
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Post()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '풀필먼트 등록', description: createOperationDescription(UserType.Admin) })
  @ApiCreatedResponse()
  @ApiException()
  async createFulfillment(@Body() createFulfillmentDTO: CreateFulfillmentDTO) {
    return this.fulfillmentService.createFulfillment(createFulfillmentDTO);
  }

  @Post('centers')
  @RequiredUserTypes(UserType.FulfillmentAdmin)
  @ApiOperation({ summary: '풀필먼트 센터 등록', description: createOperationDescription(UserType.FulfillmentAdmin) })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.CONFLICT)
  async createFulfillmentCenter(@Body() createFulfillmentCenterDTO: CreateFulfillmentCenterDTO) {
    return this.fulfillmentService.createFulfillmentCenter(createFulfillmentCenterDTO);
  }
}
