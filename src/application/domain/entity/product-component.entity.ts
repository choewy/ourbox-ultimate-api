import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Product } from './product.entity';

@Entity({ name: 'product_component', comment: '구성품' })
export class ProductComponent {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '구성품 PK' })
  readonly id: string;

  @Column({ type: 'smallint', unsigned: true, comment: '구성품 수량' })
  count: number;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '상품 PK' })
  productId: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true, comment: '구성품 PK' })
  componentProductId: string;

  @ManyToOne(() => Product, (e) => e.products, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Product, (e) => e.productComponents, { onDelete: 'CASCADE' })
  @JoinColumn()
  componentProduct: Product;
}
