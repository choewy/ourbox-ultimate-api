import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';

import { OnlyUserTypes } from '@/application/decorator/only-user-type';
import { RequiredAuth } from '@/application/decorator/required-auth';
import { UserType } from '@/application/domain/constant/enums';
import { CreatePartnerDTO } from '@/application/dto/request/create-partner.dto';

@ApiTags('고객사')
@RequiredAuth()
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @OnlyUserTypes(UserType.Admin)
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async createPartner(@Body() createPartnerDTO: CreatePartnerDTO) {
    return this.partnerService.createPartner(createPartnerDTO);
  }
}
