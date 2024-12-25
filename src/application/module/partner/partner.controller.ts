import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { GetPartnerChannelsParamDTO } from '@/application/dto/request/get-partner-channels-param.dto';
import { GetPartnersParamDTO } from '@/application/dto/request/get-partners-param.dto';
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

  @Get('channels')
  @RequiredUserTypes(UserType.Admin, UserType.PartnerUser)
  @ApiOperation({ summary: '고객사 판매채널 목록 조회' })
  @ApiOkResponse({ type: PartnersDTO })
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
}
