import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Consigner } from './consigner.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'consigner_history', comment: '발송인 변경이력' })
export class ConsignerHistory extends HistoryEntity<Consigner> {
  @ManyToOne(() => Consigner, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: Consigner;
}
