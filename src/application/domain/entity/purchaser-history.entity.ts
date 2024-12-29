import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Purchaser } from './purchaser.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'purchaser_history', comment: '매입처 변경이력' })
export class PurchaserHistory extends HistoryEntity<Purchaser> {
  @ManyToOne(() => Purchaser, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: Purchaser;
}
