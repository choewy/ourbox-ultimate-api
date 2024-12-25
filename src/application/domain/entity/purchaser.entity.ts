import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Partner } from './partner.entity';

@Entity({ name: 'purchaser', comment: '매입처' })
export class Purchaser {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '메입처 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '매입처명' })
  name: string;

  @Column({ type: 'varchar', length: 7, comment: '우편번호' })
  zipCode: string;

  @Column({ type: 'varchar', length: 255, comment: '주소' })
  address: string;

  @Column({ type: 'varchar', length: 255, comment: '상세주소' })
  detailAddress: string;

  @Column({ type: 'varchar', length: 20, comment: '연락처' })
  contact: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '고객사 PK' })
  partnerId: string | null;

  @ManyToOne(() => Partner, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  partner: Partner | null;
}
