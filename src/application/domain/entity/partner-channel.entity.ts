import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Partner } from './partner.entity';

@Entity({ name: 'partner_channel', comment: '고객사 판매 채널' })
export class PartnerChannel {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '고객사 판매 채널 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @Column({ type: 'bigint', unsigned: true, comment: '고객사 PK' })
  partnerId: string;

  @ManyToOne(() => Partner, (e) => e.partnerChannels, { onDelete: 'CASCADE' })
  @JoinColumn()
  partner: Partner;
}
