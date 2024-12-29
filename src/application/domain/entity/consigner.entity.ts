import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConsignerHistory } from './consigner-history.entity';
import { Partner } from './partner.entity';

@Entity({ name: 'consigner', comment: '발송인' })
export class Consigner {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '발송인 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '발송인명' })
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

  @OneToMany(() => ConsignerHistory, (e) => e.target, { cascade: true })
  @JoinTable()
  histories: ConsignerHistory[];
}
