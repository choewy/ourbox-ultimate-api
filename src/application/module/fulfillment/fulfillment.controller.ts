import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';

import { OnlyUserTypes } from '@/application/decorator/only-user-type';
import { RequiredAuth } from '@/application/decorator/required-auth';
import { UserType } from '@/application/domain/constant/enums';
import { CreateFulfillmentDTO } from '@/application/dto/request/create-fulfillment.dto';

@ApiTags('풀필먼트')
@RequiredAuth()
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Post()
  @OnlyUserTypes(UserType.Admin)
  @ApiOperation({ summary: '풀필먼트 등록' })
  @ApiCreatedResponse()
  async createFulfillment(@Body() createFulfillmentDTO: CreateFulfillmentDTO) {
    return this.fulfillmentService.createFulfillment(createFulfillmentDTO);
  }
}
