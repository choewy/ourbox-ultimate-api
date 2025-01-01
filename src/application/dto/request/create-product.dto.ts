import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInstance, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Min } from 'class-validator';

import { SetProductComponentDTO } from './set-product-component.dto';

import { ProductType, ProductUnit } from '@/application/domain/constant/enums';

export class CreateProductDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, enum: ProductType })
  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

  @ApiProperty({ type: String, enum: ProductUnit })
  @IsEnum(ProductUnit)
  @IsNotEmpty()
  unit: ProductUnit;

  @ApiProperty({ type: Number })
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  unitCount: number;

  @ApiPropertyOptional({ type: [SetProductComponentDTO] })
  @IsInstance(SetProductComponentDTO, { each: true })
  @IsArray()
  @IsOptional()
  @Type(() => SetProductComponentDTO)
  productComponents?: SetProductComponentDTO[];

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerChannelId?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  purchaserId?: string;
}
