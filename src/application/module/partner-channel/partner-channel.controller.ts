import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerChannelService } from './partner-channel.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { GetPartnerChannelsParamDTO } from '@/application/dto/request/get-partner-channels-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdatePartnerChannelDTO } from '@/application/dto/request/update-partner-channel.dto';
import { PartnerChannelsDTO } from '@/application/dto/response/partner-channels.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('고객사 판매채널')
@RequiredAuth()
@Controller('partner-channels')
export class PartnerChannelController {
  constructor(private readonly partnerChannelService: PartnerChannelService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerUser)
  @ApiOperation({ summary: '고객사 판매채널 목록 조회' })
  @ApiOkResponse({ type: PartnerChannelsDTO })
  @ApiException()
  async getPartnerChannels(@Query() queryParam: GetPartnerChannelsParamDTO) {
    return this.partnerChannelService.getPartnerChannels(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin)
  @ApiOperation({ summary: '고객사 판매채널 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createPartnerChannel(@Body() body: CreatePartnerChannelDTO) {
    return this.partnerChannelService.createPartnerChannel(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 판매채널 수정' })
  @ApiNoContentResponse()
  @ApiException(HttpStatus.NOT_FOUND)
  async updatePartnerChannel(@Param() param: IdParamDTO, @Body() body: UpdatePartnerChannelDTO) {
    return this.partnerChannelService.updatePartnerChannel(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 판매채널 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deletePartnerChannel(@Param() param: IdParamDTO) {
    return this.partnerChannelService.deletePartnerChannel(param.id);
  }
}
