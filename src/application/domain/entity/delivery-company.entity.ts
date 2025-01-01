import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanyCode } from '../constant/enums';
import { DeliveryCompanyEntity } from '../constant/interfaces';

@Entity({ name: 'delivery_company', comment: '배송사' })
@Unique('delivery_company_code', ['code'])
export class DeliveryCompany implements DeliveryCompanyEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '배송사 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 30, comment: '코드' })
  code: DeliveryCompanyCode;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;
}
