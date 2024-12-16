import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePartnerChannelDTO } from '@/application/dto/request/create-partner-channel.dto';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';
import { createOperationDescription } from '@/common/swagger/helper';

@ApiTags('고객사')
@RequiredAuth()
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 등록', description: createOperationDescription(UserType.Admin) })
  @ApiCreatedResponse()
  async createPartner(@Body() createPartnerDTO: CreatePartnerDTO) {
    return this.partnerService.createPartner(createPartnerDTO);
  }

  @Post('channels')
  @RequiredUserTypes(UserType.PartnerAdmin)
  @ApiOperation({ summary: '고객사 판매채널 등록', description: createOperationDescription(UserType.PartnerAdmin) })
  @ApiCreatedResponse()
  async createPartnerChannel(@Body() createPartnerChannelDTO: CreatePartnerChannelDTO) {
    return this.partnerService.createPartnerChannel(createPartnerChannelDTO);
  }
}
