import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { ListParamDTO } from '../common/list-param.dto';

export const ListBuilder = <R, T>(DTO: Type<T>) => {
  class ListDTO {
    @ApiResponseProperty({ type: Number })
    count: number;

    @ApiResponseProperty({ type: Number })
    skip: number;

    @ApiResponseProperty({ type: Number })
    take: number;

    @ApiResponseProperty({ type: DTO })
    rows: T[];

    constructor(param: ListParamDTO, [rows, count]: [R[], number]) {
      this.count = count;
      this.skip = param.skip;
      this.take = param.take;
      this.rows = rows.map((row) => new DTO(row));
    }
  }

  return ListDTO;
};
