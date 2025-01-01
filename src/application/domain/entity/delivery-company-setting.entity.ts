import { Column, Entity, Index, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CjSetting } from './delivery-company-settings/cj-setting.entity';
import { HanjinSetting } from './delivery-company-settings/hanjin-setting.entity';
import { LotteSetting } from './delivery-company-settings/lotte-setting.entity';
import { TeamfreshSetting } from './delivery-company-settings/teamfresh-setting.entity';
import { DeliveryCompany } from './delivery-company.entity';
import { FulfillmentCenter } from './fulfillment-center.entity';

@Entity({ name: 'delivery_company_setting', comment: '풀필먼트 센터 택배사 설정' })
@Index('key', ['fulfillmentCenterId', 'deliveryCompanyId'])
export class DeliveryCompanySetting {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 택배사 설정 PK' })
  readonly id: string;

  @Column({ type: 'bigint', unsigned: true, comment: '풀필먼트 센터 PK' })
  fulfillmentCenterId: string;

  @ManyToOne(() => FulfillmentCenter, { onDelete: 'CASCADE' })
  @JoinColumn()
  fulfillmentCenter: FulfillmentCenter;

  @Column({ type: 'bigint', unsigned: true, comment: '택배사 PK' })
  deliveryCompanyId: string;

  @ManyToOne(() => DeliveryCompany, { onDelete: 'CASCADE' })
  @JoinColumn()
  deliveryCompany: DeliveryCompany;

  @Column({ type: 'varchar', length: 7, comment: '발송지 우편번호' })
  zipCode: string;

  @Column({ type: 'varchar', length: 255, comment: '발송지 주소' })
  address: string;

  @Column({ type: 'varchar', length: 255, comment: '발송지 상세주소' })
  detailAddress: string;

  @OneToOne(() => HanjinSetting, (e) => e.deliveryCompanySetting, { nullable: true, cascade: true })
  @JoinTable()
  hanjinSetting: HanjinSetting | null;

  @OneToOne(() => CjSetting, (e) => e.deliveryCompanySetting, { nullable: true, cascade: true })
  @JoinTable()
  cjSetting: CjSetting | null;

  @OneToOne(() => LotteSetting, (e) => e.deliveryCompanySetting, { nullable: true, cascade: true })
  @JoinTable()
  lotteSetting: LotteSetting | null;

  @OneToOne(() => TeamfreshSetting, (e) => e.deliveryCompanySetting, { nullable: true, cascade: true })
  @JoinTable()
  teamfreshSetting: TeamfreshSetting | null;
}
