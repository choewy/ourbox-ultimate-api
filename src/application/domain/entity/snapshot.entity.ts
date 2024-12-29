import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

import { SnapshotAction } from '../constant/enums';

// TODO 각 entity Snapshot으로 분리
// ex) UserSnapshot, PartnerSnapShot
@Entity({ name: 'snapshot', comment: '스냅샷' })
@Index('snapshot_target_id', ['id'])
@Index('snapshot_target_name', ['name'])
@Index('snapshot_target_search', ['name', 'id'])
@Index('snapshot_action', ['action'])
@Index('snapshot_executor_id', ['executorId'])
export class Snapshot {
  @PrimaryColumn({ type: 'varchar', length: 50, comment: '대상 테이블명' })
  name: string;

  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '대상 PK' })
  id: string;

  @PrimaryColumn({ type: 'int', unsigned: true, default: 0, comment: '버전' })
  revision: number;

  @Column({ type: 'varchar', length: 20, comment: '구분(수정/삭제)' })
  action: SnapshotAction;

  @Column({ type: 'json', default: null, comment: '수정전' })
  before: object | null;

  @Column({ type: 'json', default: null, comment: '수정데이터' })
  after: object | null;

  @Column({ type: 'bigint', unsigned: true, comment: '수행자 PK' })
  executorId: string;

  @Column({ type: 'json', default: null, comment: '수행자' })
  executor: object;

  @CreateDateColumn({ comment: '생성일시' })
  readonly createdAt: Date;
}
