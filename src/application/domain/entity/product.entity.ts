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

import { PartnerChannel } from './partner-channel.entity';
import { ProductComponent } from './product-component.entity';
import { Purchaser } from './purchaser.entity';
import { ProductType, ProductUnit } from '../constant/enums';

@Entity({ name: 'product', comment: '상품' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '상품 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 255, comment: '상품명' })
  name: string;

  @Column({ type: 'varchar', length: 10, comment: '종류(단품/세트)' })
  type: ProductType;

  @Column({ type: 'varchar', length: 10, comment: '단위' })
  unit: ProductUnit;

  @Column({ type: 'smallint', unsigned: true, comment: '단위 입수량' })
  unitCount: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '고객사 판매 채널 PK' })
  partnerChannelId: string | null;

  @ManyToOne(() => PartnerChannel, { onDelete: 'CASCADE' })
  @JoinColumn()
  partnerChannel: PartnerChannel;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '매입처 PK' })
  purchaserId: string | null;

  @ManyToOne(() => Purchaser, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  purchaser: Purchaser | null;

  @OneToMany(() => ProductComponent, (e) => e.product, { cascade: true })
  @JoinTable()
  products: ProductComponent[];

  @OneToMany(() => ProductComponent, (e) => e.componentProduct, { cascade: ['remove'] })
  @JoinTable()
  productComponents: ProductComponent[];
}
