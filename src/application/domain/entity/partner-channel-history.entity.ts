import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { PartnerChannel } from './partner-channel.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'partner_channel_history', comment: '고객사 판매채널 변경이력' })
export class PartnerChannelHistory extends HistoryEntity<PartnerChannel> {
  @ManyToOne(() => PartnerChannel, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: PartnerChannel;
}
