import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { FulfillmentCenter } from './fulfillment-center.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'fulfillment_center_history', comment: '풀필먼트 센터 변경이력' })
export class FulfillmentCenterHistory extends HistoryEntity<FulfillmentCenter> {
  @ManyToOne(() => FulfillmentCenter, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: FulfillmentCenter;
}
