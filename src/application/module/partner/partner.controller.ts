import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { GetPartnerChannelsParamDTO } from '@/application/dto/request/get-partner-channels-param.dto';
import { GetPartnersParamDTO } from '@/application/dto/request/get-partners-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdatePartnerChannelDTO } from '@/application/dto/request/update-partner-channel.dto';
import { UpdatePartnerDTO } from '@/application/dto/request/update-partner.dto';
import { PartnerChannelsDTO } from '@/application/dto/response/partner-channels.dto';
import { PartnersDTO } from '@/application/dto/response/partners.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('고객사')
@RequiredAuth()
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 목록 조회' })
  @ApiOkResponse({ type: PartnersDTO })
  @ApiException()
  async getPartners(@Query() queryParam: GetPartnersParamDTO) {
    return this.partnerService.getPartners(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createPartner(@Body() body: CreatePartnerDTO) {
    return this.partnerService.createPartner(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updatePartner(@Param() param: IdParamDTO, @Body() body: UpdatePartnerDTO) {
    return this.partnerService.updatePartner(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deletePartner(@Param() param: IdParamDTO) {
    return this.partnerService.deletePartner(param.id);
  }

  @Get('channels')
  @RequiredUserTypes(UserType.Admin, UserType.PartnerUser)
  @ApiOperation({ summary: '고객사 판매채널 목록 조회' })
  @ApiOkResponse({ type: PartnerChannelsDTO })
  @ApiException()
  async getPartnerChannels(@Query() queryParam: GetPartnerChannelsParamDTO) {
    return this.partnerService.getPartnerChannels(queryParam);
  }

  @Post('channels')
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin)
  @ApiOperation({ summary: '고객사 판매채널 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createPartnerChannel(@Body() body: CreatePartnerChannelDTO) {
    return this.partnerService.createPartnerChannel(body);
  }

  @Patch('channels/:id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 판매채널 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updatePartnerChannel(@Param() param: IdParamDTO, @Body() body: UpdatePartnerChannelDTO) {
    return this.partnerService.updatePartnerChannel(param.id, body);
  }

  @Delete('channels/:id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 판매채널 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deletePartnerChannel(@Param() param: IdParamDTO) {
    return this.partnerService.deletePartnerChannel(param.id);
  }
}
