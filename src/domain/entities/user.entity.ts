import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';

import { UserType } from '../enums';
import { BigIntValueTransformer } from '../transformers';
import { BigIntId } from '../vo';

@Entity({ name: 'user', comment: '사용자' })
export class User {
  @Column({
    primary: true,
    type: 'bigint',
    unsigned: true,
    generated: 'increment',
    transformer: new BigIntValueTransformer(),
    comment: '사용자 PK',
  })
  readonly id: BigIntId;

  @Column({ type: 'varchar', length: 10, default: UserType.Member, comment: '구분' })
  type: UserType;

  @Column({ type: 'varchar', length: 340, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}