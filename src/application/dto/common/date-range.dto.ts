import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { DateTime } from 'luxon';

import { ToEndDateTime, ToStartDateTime } from '@/constant/transformer/date-range.transformer';

export class DateRangeParamDTO {
  @ApiPropertyOptional({ type: Date })
  @IsDateString()
  @IsOptional()
  @ToStartDateTime()
  startDate?: DateTime;

  @ApiPropertyOptional({ type: Date })
  @IsDateString()
  @IsOptional()
  @ToEndDateTime()
  endDate?: DateTime;
}
