import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInstance, IsInt, IsNumberString, IsOptional, IsString, Min } from 'class-validator';

import { SetProductComponentDTO } from './set-product-component.dto';

import { ProductType, ProductUnit } from '@/application/domain/constant/enums';

export class UpdateProductDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, enum: ProductType })
  @IsEnum(ProductType)
  @IsOptional()
  type?: ProductType;

  @ApiPropertyOptional({ type: String, enum: ProductUnit })
  @IsEnum(ProductUnit)
  @IsOptional()
  unit?: ProductUnit;

  @ApiPropertyOptional({ type: Number })
  @Min(1)
  @IsInt()
  @IsOptional()
  unitCount?: number;

  @ApiPropertyOptional({ type: [SetProductComponentDTO] })
  @IsInstance(SetProductComponentDTO, { each: true })
  @IsArray()
  @IsOptional()
  productComponents?: SetProductComponentDTO[];

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  purchaserId?: string;
}
