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

  async hasById(id: string) {
    return !!(await this.findOne({ select: { id: true }, where: { id } }))?.id;
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

  async deleteOneById(id: string) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).softDelete(id);
    });
  }
}
