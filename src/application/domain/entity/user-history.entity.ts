import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { HistoryEntity } from '../abstract/history.entity';

@Entity({ name: 'user_history', comment: '사용자 변경이력' })
export class UserHistory extends HistoryEntity<User> {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  declare target: User;
}
