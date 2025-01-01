import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanySetting } from '../delivery-company-setting.entity';

@Entity({ name: 'teamfresh_setting', comment: '풀필먼트 센터 택배사(팀프레시) 설정' })
export class TeamfreshSetting {
  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 센터 택배사 설정 PK' })
  deliveryCompanySettingId: string;

  @OneToOne(() => DeliveryCompanySetting, (e) => e.cjSetting, { onDelete: 'CASCADE' })
  @JoinColumn()
  deliveryCompanySetting: DeliveryCompanySetting;

  @Column({ type: 'varchar', length: 255, comment: 'API KEY' })
  apiKey: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;
}
