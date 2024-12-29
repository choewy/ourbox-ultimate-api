import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ConsignerService } from './consigner.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateConsignerDTO } from '@/application/dto/request/create-consigner.dto';
import { GetConsignersParamDTO } from '@/application/dto/request/get-consigners-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateConsignerDTO } from '@/application/dto/request/update-consigner.dto';
import { ConsignersDTO } from '@/application/dto/response/consigners.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('발송인')
@RequiredAuth()
@Controller('consigners')
export class ConsignerController {
  constructor(private readonly consignerService: ConsignerService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '발송인 목록 조회' })
  @ApiOkResponse({ type: ConsignersDTO })
  @ApiException()
  async getConsginers(@Query() queryParam: GetConsignersParamDTO) {
    return this.consignerService.getConsigners(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '발송인 등록' })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async createConsigner(@Body() body: CreateConsignerDTO) {
    return this.consignerService.createConsigner(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '발송인 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updateConsigner(@Param() param: IdParamDTO, @Body() body: UpdateConsignerDTO) {
    return this.consignerService.updateConsigner(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '발송인 삭제' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async deleteConsigner(@Param() param: IdParamDTO) {
    return this.consignerService.deleteConsigner(param.id);
  }
}
