import { Injectable } from '@nestjs/common';

import { ProductType, UserType } from '@/application/domain/constant/enums';
import { ProductComponent } from '@/application/domain/entity/product-component.entity';
import { User } from '@/application/domain/entity/user.entity';
import { PartnerChannelRepository } from '@/application/domain/repository/partner-channel.repository';
import { ProductHistoryRepository } from '@/application/domain/repository/product-history.repository';
import { ProductRepository } from '@/application/domain/repository/product.repository';
import { PurchaserRepository } from '@/application/domain/repository/purchaser.repository';
import { CreateProductDTO } from '@/application/dto/request/create-product.dto';
import { GetProductsParamDTO } from '@/application/dto/request/get-products-param.dto';
import { UpdateProductDTO } from '@/application/dto/request/update-product.dto';
import { ProductHistoriesDTO } from '@/application/dto/response/product-histories.dto';
import { ProductsDTO } from '@/application/dto/response/products.dto';
import { RequestContextService } from '@/common/request-context/request-context.service';
import {
  AccessDeninedException,
  CannotUseResourceException,
  NotFoundPartnerChannelException,
  NotFoundProductException,
  NotFoundProductsException,
  NotFoundPurchaserException,
  ValidationFailedException,
} from '@/constant/exceptions';

@Injectable()
export class ProductService {
  constructor(
    private readonly requestContextService: RequestContextService,
    private readonly productRepository: ProductRepository,
    private readonly productHistoryRepository: ProductHistoryRepository,
    private readonly partnerChannelRepository: PartnerChannelRepository,
    private readonly purchaserRepository: PurchaserRepository,
  ) {}

  private async validateProductComponents(body: CreateProductDTO | UpdateProductDTO, partnerChannelId?: string) {
    if (body.type !== ProductType.Combo) {
      return [];
    }

    if (!Array.isArray(body.productComponents) || body.productComponents.length === 0) {
      throw new ValidationFailedException([
        {
          target: body,
          value: body.productComponents,
          property: 'productComponents',
          children: [],
          constraints: {
            isNotEmpty: 'productComponents should not be empty',
          },
        },
      ]);
    }

    const productComponentIds = body.productComponents.map(({ productId }) => productId);
    const productComponentHas = await this.productRepository.hasMany(productComponentIds, partnerChannelId);
    const notFoundProducts = productComponentHas.filter((row) => row.has === false);

    if (notFoundProducts.length > 0) {
      throw new NotFoundProductsException(notFoundProducts);
    }

    return body.productComponents.map((param) => {
      const productComponent = new ProductComponent();

      productComponent.componentProductId = param.productId;
      productComponent.count = param.count;

      return productComponent;
    });
  }

  async getProducts(param: GetProductsParamDTO) {
    return new ProductsDTO(param, await this.productRepository.findManyAndCount(param.partnerId, param.partnerChannelId, param.skip, param.take));
  }

  async getProductHistories(id: string) {
    return new ProductHistoriesDTO(id, await this.productHistoryRepository.findMany(id));
  }

  async createProduct(body: CreateProductDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const partnerChannelId = requestUser.getPartnerChannelId(body.partnerChannelId);

    if (partnerChannelId) {
      const partnerChannel = await this.partnerChannelRepository.findOneById(partnerChannelId);

      if (!partnerChannel) {
        throw new NotFoundPartnerChannelException(partnerChannelId);
      }

      if (requestUser.type !== UserType.Admin && requestUser.partnerId !== partnerChannel.partnerId) {
        throw new CannotUseResourceException();
      }
    }

    const purchaserId = body.purchaserId;

    if (purchaserId) {
      const purchaser = await this.purchaserRepository.findOneById(purchaserId);

      if (!purchaser) {
        throw new NotFoundPurchaserException(purchaserId);
      }

      if (requestUser.type !== UserType.Admin && requestUser.partnerId !== purchaser.partnerId) {
        throw new CannotUseResourceException();
      }
    }

    const productComponents = await this.validateProductComponents(body, partnerChannelId);

    await this.productRepository.insertOne(requestUser, {
      name: body.name,
      type: body.type,
      unit: body.unit,
      unitCount: body.unitCount,
      purchaserId,
      partnerChannelId,
      productComponents,
    });
  }

  async updateProduct(id: string, body: UpdateProductDTO) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const product = await this.productRepository.findOneById(id);

    if (!product) {
      throw new NotFoundProductException(id);
    }

    const partnerChannelId = requestUser.getPartnerChannelId();

    if (requestUser.type !== UserType.Admin && product.partnerChannelId !== partnerChannelId) {
      throw new AccessDeninedException();
    }

    const purchaserId = body.purchaserId;

    if (purchaserId) {
      const purchaser = await this.purchaserRepository.findOneById(purchaserId);

      if (!purchaser) {
        throw new NotFoundPurchaserException(purchaserId);
      }

      if (requestUser.type !== UserType.Admin && requestUser.partnerId !== purchaser.partnerId) {
        throw new CannotUseResourceException();
      }
    }

    const productComponents = await this.validateProductComponents(body, partnerChannelId);

    await this.productRepository.updateOne(requestUser, product, {
      type: body.type && body.type !== product.type ? body.type : undefined,
      name: body.name && body.name !== product.name ? body.name : undefined,
      unit: body.unit && body.unit !== product.unit ? body.unit : undefined,
      unitCount: body.unitCount && body.unitCount !== product.unitCount ? body.unitCount : undefined,
      purchaserId,
      productComponents,
    });
  }

  async deleteProduct(id: string) {
    const requestUser = this.requestContextService.getRequestUser<User>();
    const product = await this.productRepository.findOneById(id);

    if (!product) {
      throw new NotFoundProductException(id);
    }

    const partnerChannelId = requestUser.getPartnerChannelId();

    if (requestUser.type !== UserType.Admin && product.partnerChannelId !== partnerChannelId) {
      throw new AccessDeninedException();
    }

    await this.productRepository.deleteOne(requestUser, product);
  }
}
