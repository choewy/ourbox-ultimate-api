import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Product } from './product.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'product_history', comment: '품목 변경이력' })
export class ProductHistory extends HistoryEntity<Product> {
  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: Product;
}
