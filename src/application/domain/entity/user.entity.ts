import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserStatus } from '../constant/enums';

import { PasswordColumnTransformer } from '@/constant/transformer/password.transformer';
import { PasswordVO } from '@/constant/vo/password.vo';

@Entity({ name: 'user', comment: '사용자' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '사용자 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 340, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호', transformer: new PasswordColumnTransformer() })
  password: PasswordVO;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 10, default: UserStatus.Activated, comment: '상태' })
  status: UserStatus;

  @CreateDateColumn({ comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ comment: '삭제일시' })
  deletedAt: Date | null;
}
