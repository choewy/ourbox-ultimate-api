import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(User, entityManager ?? datatSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: {
        partner: true,
        partnerChannel: { partner: true },
        fulfillment: true,
        fulfillmentCenter: { fulfillment: true },
      },
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  async hasEmail(email: string) {
    return this.existsBy({ email });
  }

  async findManyAndCount(skip: number, take: number) {
    return this.findAndCount({
      relations: {
        partner: true,
        partnerChannel: { partner: true },
        fulfillment: true,
        fulfillmentCenter: { fulfillment: true },
      },
      skip,
      take,
    });
  }
}
