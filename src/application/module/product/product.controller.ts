import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateProductDTO } from '@/application/dto/request/create-product.dto';
import { GetProductsParamDTO } from '@/application/dto/request/get-products-param.dto';
import { IdParamDTO } from '@/application/dto/request/id-param.dto';
import { UpdateProductDTO } from '@/application/dto/request/update-product.dto';
import { ProductHistoriesDTO } from '@/application/dto/response/product-histories.dto';
import { ProductsDTO } from '@/application/dto/response/products.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('품목')
@RequiredAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: '품목 목록 조회' })
  @ApiOkResponse({ type: ProductsDTO })
  @ApiException()
  async getProducts(@Query() queryParam: GetProductsParamDTO) {
    return this.productService.getProducts(queryParam);
  }

  @Get(':id(\\d+)/histories')
  @ApiOperation({ summary: '품목 수정이력 목록 조회' })
  @ApiOkResponse({ type: ProductHistoriesDTO })
  @ApiException()
  async getProductHistories(@Param() param: IdParamDTO) {
    return this.productService.getProductHistories(param.id);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '품목 등록' })
  @ApiCreatedResponse()
  @ApiException()
  async createProduct(@Body() body: CreateProductDTO) {
    return this.productService.createProduct(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '품목 수정' })
  @ApiNoContentResponse()
  @ApiException()
  async updateProduct(@Param() param: IdParamDTO, @Body() body: UpdateProductDTO) {
    return this.productService.updateProduct(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredUserTypes(UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser)
  @ApiOperation({ summary: '품목 삭제' })
  @ApiNoContentResponse()
  @ApiException()
  async deleteProduct(@Param() param: IdParamDTO) {
    return this.productService.deleteProduct(param.id);
  }
}
