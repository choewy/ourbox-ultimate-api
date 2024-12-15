import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FulfillmentCenter } from './fulfillment-center.entity';

@Entity({ name: 'fulfillment', comment: '풀필먼트' })
export class Fulfillment {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @OneToMany(() => FulfillmentCenter, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  fulfillmentCenters: FulfillmentCenter[];
}
