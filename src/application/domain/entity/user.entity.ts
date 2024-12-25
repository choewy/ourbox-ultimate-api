import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { FulfillmentCenter } from './fulfillment-center.entity';
import { Fulfillment } from './fulfillment.entity';
import { PartnerChannel } from './partner-channel.entity';
import { Partner } from './partner.entity';
import { UserStatus, UserType } from '../constant/enums';

import { PasswordColumnTransformer } from '@/constant/transformer/password.transformer';
import { PasswordVO } from '@/constant/vo/password.vo';

@Entity({ name: 'user', comment: '사용자' })
@Unique('unique', ['email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '사용자 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 10, comment: '구분' })
  type: UserType;

  @Column({ type: 'varchar', length: 340, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호', transformer: new PasswordColumnTransformer() })
  password: PasswordVO;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 10, default: UserStatus.Activated, comment: '상태' })
  status: UserStatus;

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

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '고객사 판매 채널 PK' })
  partnerChannelId: string | null;

  @ManyToOne(() => PartnerChannel, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  partnerChannel: PartnerChannel | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '풀필먼트 PK' })
  fulfillmentId: string | null;

  @ManyToOne(() => Fulfillment, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  fulfillment: Fulfillment | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '풀필먼트 센터 PK' })
  fulfillmentCenterId: string | null;

  @ManyToOne(() => FulfillmentCenter, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  fulfillmentCenter: FulfillmentCenter | null;

  public getPartnerId(partnerId?: string) {
    switch (this.type) {
      case UserType.Admin:
        return partnerId ?? null;

      case UserType.PartnerAdmin:
        return this.partnerId;

      case UserType.PartnerUser:
        return this.partnerChannel?.partnerId;

      default:
        return null;
    }
  }

  public getFulfillmentId(fulfillmentId?: number) {
    switch (this.type) {
      case UserType.Admin:
        return fulfillmentId ?? null;

      case UserType.FulfillmentAdmin:
        return this.fulfillmentId;

      case UserType.FulfillmentUser:
        return this.fulfillmentCenter?.fulfillmentId;

      default:
        return null;
    }
  }
}
