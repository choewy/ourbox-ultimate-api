import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PartnerChannel } from './partner-channel.entity';

@Entity({ name: 'partner', comment: '고객사' })
export class Partner {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '고객사 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @OneToMany(() => PartnerChannel, (e) => e.partner, { cascade: true })
  @JoinTable()
  partnerChannels: PartnerChannel[];
}
