import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

import { ListParamDTO } from '../common/list-param.dto';

export class GetConsignersParamDTO extends ListParamDTO {
  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerId?: string;
}
