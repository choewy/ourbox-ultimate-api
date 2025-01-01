import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetDeliveryCompanySettingsParamDTO {
  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentCenterId?: string;
}
