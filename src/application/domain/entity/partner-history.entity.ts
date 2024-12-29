import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Partner } from './partner.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'partner_history', comment: '고객사 변경이력' })
export class PartnerHistory extends HistoryEntity<Partner> {
  @ManyToOne(() => Partner, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: Partner;
}
