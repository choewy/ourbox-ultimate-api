import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

import { ListParamDTO } from '../common/list-param.dto';

export class GetProductsParamDTO extends ListParamDTO {
  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerId?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerChannelId?: string;
}
