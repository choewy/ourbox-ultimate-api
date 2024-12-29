import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Fulfillment } from './fulfillment.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'fulfillment_history', comment: '풀필먼트 변경이력' })
export class FulfillmentHistory extends HistoryEntity<Fulfillment> {
  @ManyToOne(() => Fulfillment, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: Fulfillment;
}
