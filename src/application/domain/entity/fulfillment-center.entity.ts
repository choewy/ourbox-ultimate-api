import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { Fulfillment } from './fulfillment.entity';

@Entity({ name: 'fulfillment_center', comment: '풀필먼트 센터' })
@Unique('unique', ['fulfillmentId', 'code'])
export class FulfillmentCenter {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 센터 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 5, comment: '풀필먼트 센터 코드' })
  code: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @Column({ type: 'bigint', unsigned: true, comment: '풀필먼트 PK' })
  fulfillmentId: string;

  @ManyToOne(() => Fulfillment, (e) => e.fulfillmentCenters, { onDelete: 'CASCADE' })
  @JoinColumn()
  fulfillment: Fulfillment;
}
