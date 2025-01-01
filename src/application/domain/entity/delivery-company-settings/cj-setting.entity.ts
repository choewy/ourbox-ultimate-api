import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanySetting } from '../delivery-company-setting.entity';

@Entity({ name: 'cj_setting', comment: '풀필먼트 센터 택배사(CJ) 설정' })
export class CjSetting {
  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 센터 택배사 설정 PK' })
  deliveryCompanySettingId: string;

  @OneToOne(() => DeliveryCompanySetting, (e) => e.cjSetting, { onDelete: 'CASCADE' })
  @JoinColumn()
  deliveryCompanySetting: DeliveryCompanySetting;

  @Column({ type: 'varchar', length: 10, comment: '고객사 코드' })
  clientCode: string;

  @Column({ type: 'varchar', length: 50, comment: 'Oracle DB Username' })
  oracleUsername: string;

  @Column({ type: 'varchar', length: 255, comment: 'Oracle DB Password' })
  oraclePassword: string;

  @Column({ type: 'varchar', length: 50, comment: '주소정제 아이디' })
  addressStandardizationId: string;

  @Column({ type: 'varchar', length: 255, comment: '주소정제 비밀번호' })
  addressStandardizationPassword: string;

  @Column({ type: 'varchar', length: 30, comment: '송장발번 대역(최소)' })
  minTrackingNumberRange: string;

  @Column({ type: 'varchar', length: 30, comment: '송장발번 대역(쵀대)' })
  maxTrackingNumberRange: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;
}
