import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { Product } from '../entity/product.entity';

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
      relations: {
        partnerChannel: { partner: true },
        purchaser: true,
        productComponents: { product: true },
      },
      where: { id },
    });
  }
}
