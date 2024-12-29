import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { SnapshotAction } from '../constant/enums';
import { Snapshot } from '../entity/snapshot.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class SnapshotRepository extends Repository<Snapshot> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Snapshot, entityManager ?? datatSource.createEntityManager());
  }

  public static ofEntityManager(em: EntityManager) {
    return new SnapshotRepository(null, em);
  }

  private getTargetName<T extends { id: string }>(target: T) {
    return (this.datatSource ?? this.entityManager).getRepository(Object.getPrototypeOf(target).constructor).metadata.tableName;
  }

  private async getRevision(name: string, id: string) {
    const snapshot = await this.findOne({
      select: { revision: true },
      where: { name, id },
      order: { revision: 'DESC' },
      lock: { mode: 'pessimistic_write' },
    });

    return snapshot ? snapshot?.revision : 0;
  }

  async forInsert<T extends { id: string }>(executor: User, target: T) {
    const name = this.getTargetName(target);

    return super.insert({
      name,
      id: target.id,
      revision: 0,
      action: SnapshotAction.Insert,
      executorId: executor.id,
      executor,
      after: target,
    });
  }

  async forUpdate<T extends { id: string }>(executor: User, target: T, after: object = null) {
    const name = this.getTargetName(target);

    return super.insert({
      name,
      id: target.id,
      revision: (await this.getRevision(name, target.id)) + 1,
      action: SnapshotAction.Update,
      executorId: executor.id,
      executor,
      before: target,
      after,
    });
  }

  async forDelete<T extends { id: string }>(executor: User, target: T) {
    const name = this.getTargetName(target);

    return super.insert({
      name,
      id: target.id,
      revision: (await this.getRevision(name, target.id)) + 1,
      action: SnapshotAction.Delete,
      executorId: executor.id,
      executor,
      before: target,
    });
  }
}
