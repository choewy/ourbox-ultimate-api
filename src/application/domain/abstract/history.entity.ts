import { Column, CreateDateColumn, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { HistoryAction } from '../constant/enums';
import { User } from '../entity/user.entity';

export abstract class HistoryEntity<T extends object> {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '스냅샷 PK' })
  id: string;

  @Index('history_action', ['action'])
  @Column({ type: 'varchar', length: 20, comment: '구분(수정/삭제)' })
  action: HistoryAction;

  @Column({ type: 'json', default: null, comment: '수정전' })
  before: object | null;

  @Column({ type: 'json', default: null, comment: '수정데이터' })
  after: object | null;

  @Column({ type: 'bigint', unsigned: true, comment: '대상 PK' })
  targetId: string;
  target: T;

  @Column({ type: 'bigint', unsigned: true, comment: '수행자 PK' })
  executorId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  executor: User;

  @CreateDateColumn({ comment: '생성일시' })
  readonly createdAt: Date;

  constructor(action: HistoryAction, executor: User, target: T, value?: Partial<T>) {
    this.action = action;
    this.target = target;
    this.executor = executor;

    switch (action) {
      case HistoryAction.Insert:
        this.before = null;
        this.after = target;

        break;

      case HistoryAction.Update:
        this.before = target;
        this.after = value;

        break;

      case HistoryAction.Delete:
        this.before = target;
        this.after = null;

        break;
    }
  }
}
