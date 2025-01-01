import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeliveryCompanyService } from './delivery-company.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { DeliveryCompanyDTO } from '@/application/dto/response/delivery-company.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('택배사')
@RequiredAuth()
@RequiredUserTypes(UserType.Admin)
@Controller('delivery-companies')
export class DeliveryCompanyController {
  constructor(private readonly deliveryCompanyService: DeliveryCompanyService) {}

  @Get()
  @ApiOperation({ summary: '택배사 목록 조회' })
  @ApiOkResponse({ type: [DeliveryCompanyDTO] })
  @ApiException()
  async getDeliveryCompanies() {
    return this.deliveryCompanyService.getDeliveryCompanies();
  }
}
