import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager, Equal, Repository } from 'typeorm';

import { HistoryAction, ProductType } from '../constant/enums';
import { HasManyEntity } from '../entity/has-many.entity';
import { ProductComponent } from '../entity/product-component.entity';
import { ProductHistory } from '../entity/product-history.entity';
import { Product } from '../entity/product.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Product, entityManager ?? datatSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: { products: { componentProduct: true } },
      where: { id },
    });
  }

  async hasMany(ids: string[], partnerChannelId?: string) {
    const joinConditions = ['temp.id = product.id'];

    if (partnerChannelId) {
      joinConditions.push(`product.partner_channel_id = ${partnerChannelId}`);
    }

    const hasRows = await this.entityManager
      .createQueryBuilder()
      .select(['temp.id AS id', 'IF(product.id IS NULL, 0, 1) AS has'])
      .from(['(', ids.map((id) => `SELECT ${id} AS id`).join(' UNION DISTINCT '), ')'].join(''), 'temp')
      .leftJoin(Product, 'product', joinConditions.join(' AND '))
      .getRawMany<{ id: string; has: '0' | '1' }>();

    return plainToInstance(HasManyEntity, hasRows);
  }

  async findManyAndCount(partnerId = null, partnerChannelId = null, skip: number, take: number) {
    return this.findAndCount({
      relations: {
        products: { componentProduct: true },
        partnerChannel: true,
        purchaser: true,
      },
      where: {
        partnerChannel: {
          id: partnerChannelId ? Equal(partnerChannelId) : undefined,
          partnerId: partnerId ? Equal(partnerId) : undefined,
        },
      },
      skip,
      take,
    });
  }

  async insertOne(executor: User, value: Partial<Product>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Product).insert(target);

      if (value.productComponents) {
        await em.getRepository(ProductComponent).insert(
          value.productComponents.map((productComponent) => {
            productComponent.product = target;

            return productComponent;
          }),
        );
      }

      await em.getRepository(ProductHistory).insert(new ProductHistory(HistoryAction.Insert, executor, target));
    });
  }

  async updateOne(executor: User, target: Product, value: Partial<Product>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Product).update(target.id, value);

      switch (true) {
        case value.type === ProductType.Single:
          await em.getRepository(ProductComponent).softDelete({ productId: target.id });
          break;

        case value.type === ProductType.Combo && Array.isArray(value.productComponents) && value.productComponents.length > 0:
          await em.getRepository(ProductComponent).delete({ productId: target.id });
          await em.getRepository(ProductComponent).insert(value.productComponents);
          break;
      }

      await em.getRepository(ProductHistory).insert(new ProductHistory(HistoryAction.Update, executor, target, value));
    });
  }

  async deleteOne(executor: User, target: Product) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Product).softDelete(target.id);
      await em.getRepository(ProductComponent).softDelete({ productId: target.id });
      await em.getRepository(ProductComponent).softDelete({ componentProductId: target.id });
      await em.getRepository(ProductHistory).insert(new ProductHistory(HistoryAction.Delete, executor, target));
    });
  }
}
