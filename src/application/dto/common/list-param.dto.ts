import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class ListParamDTO {
  @ApiPropertyOptional({ type: Number })
  @Min(0)
  @IsInt()
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional({ type: Number })
  @Min(0)
  @IsInt()
  @IsOptional()
  take?: number;
}
