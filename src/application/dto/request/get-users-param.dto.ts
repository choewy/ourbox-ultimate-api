import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInstance, IsOptional, IsString } from 'class-validator';

import { DateRangeParamDTO } from '../common/date-range.dto';
import { ListParamDTO } from '../common/list-param.dto';
import { UserDTO } from '../response/user.dto';

import { OrderBy, TypeOrmOrderBy } from '@/constant/enums';
import { ToQueryOrderBy } from '@/constant/transformer/query-order-by.transformer';

export class GetUserListDateRangeDTO {
  @ApiPropertyOptional({ type: DateRangeParamDTO })
  @IsDateString()
  @IsOptional()
  createdAt?: DateRangeParamDTO;

  @ApiPropertyOptional({ type: DateRangeParamDTO })
  @IsDateString()
  @IsOptional()
  updatedAt?: DateRangeParamDTO;
}

export class GetUserListOrderByDTO
  implements
    Partial<
      Record<
        keyof Pick<UserDTO, 'id' | 'email' | 'name' | 'createdAt' | 'updatedAt' | 'partner' | 'partnerChannel' | 'fulfillment' | 'fulfillmentCenter'>,
        TypeOrmOrderBy
      >
    >
{
  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  id?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  type?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  name?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  email?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  createdAt?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  updatedAt?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  partner?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  partnerChannel?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  fulfillment?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String, enum: OrderBy })
  @IsEnum(OrderBy)
  @IsOptional()
  @ToQueryOrderBy()
  fulfillmentCenter?: TypeOrmOrderBy;
}

export class GetUserListKeywordDTO
  implements Partial<Record<keyof Pick<UserDTO, 'id' | 'type' | 'email' | 'name' | 'partner' | 'partnerChannel' | 'fulfillment' | 'fulfillmentCenter'>, string>>
{
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  email?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  partner?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  partnerChannel?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  fulfillment?: TypeOrmOrderBy;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  fulfillmentCenter?: TypeOrmOrderBy;
}

export class GetUsersParamDTO extends ListParamDTO {
  @ApiPropertyOptional({ type: GetUserListKeywordDTO })
  @IsInstance(GetUserListKeywordDTO)
  @IsOptional()
  keyword?: GetUserListKeywordDTO;

  @ApiPropertyOptional({ type: GetUserListDateRangeDTO })
  @IsInstance(GetUserListDateRangeDTO)
  @IsOptional()
  dateRange?: GetUserListDateRangeDTO;

  @ApiPropertyOptional({ type: GetUserListOrderByDTO })
  @IsInstance(GetUserListOrderByDTO)
  @IsOptional()
  orderBy?: GetUserListOrderByDTO;
}
