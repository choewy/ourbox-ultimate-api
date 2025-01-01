import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanySetting } from '../delivery-company-setting.entity';

@Entity({ name: 'hanjin_setting', comment: '풀필먼트 센터 택배사(한진) 설정' })
export class HanjinSetting {
  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 센터 택배사 설정 PK' })
  deliveryCompanySettingId: string;

  @OneToOne(() => DeliveryCompanySetting, (e) => e.hanjinSetting, { onDelete: 'CASCADE' })
  @JoinColumn()
  deliveryCompanySetting: DeliveryCompanySetting;

  @Column({ type: 'varchar', length: 255, comment: 'Client ID' })
  clientId: string;

  @Column({ type: 'varchar', length: 255, comment: 'API KEY' })
  apiKey: string;

  @Column({ type: 'varchar', length: 255, comment: 'API SECRET' })
  apiSecret: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;
}
