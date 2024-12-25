import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

import { ListParamDTO } from '../common/list-param.dto';

export class GetFulfillmentCentersParamDTO extends ListParamDTO {
  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentId?: string;
}
