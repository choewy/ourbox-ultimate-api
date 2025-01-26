import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInstance, IsOptional, IsString } from 'class-validator';

import { DateRangeParamDTO } from '../common/date-range.dto';
import { ListParamDTO } from '../common/list-param.dto';
import { UserSearchKeywordField } from '../enums';
import { UserDTO } from '../response/user.dto';

import { UserStatus, UserType } from '@/application/domain/constant/enums';
import { OrderBy, TypeOrmOrderBy } from '@/constant/enums';
import { ToQueryOrderBy } from '@/constant/transformer/query-order-by.transformer';
import { Trim } from '@/constant/transformer/trim.transformer';

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

export class GetUserListKeywordDTO {
  @ApiPropertyOptional({ type: String, enum: UserSearchKeywordField })
  @IsEnum(UserSearchKeywordField)
  @IsOptional()
  field?: UserSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @Trim()
  value?: string;
}

export class GetUserListFilterDTO {
  @ApiPropertyOptional({ type: String, enum: UserType })
  @IsEnum(UserType)
  @IsOptional()
  type?: UserType;

  @ApiPropertyOptional({ type: String, enum: UserStatus })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

export class GetUserListParamDTO extends ListParamDTO {
  @ApiPropertyOptional({ type: GetUserListFilterDTO })
  @IsInstance(GetUserListFilterDTO)
  @IsOptional()
  filter?: GetUserListFilterDTO;

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
