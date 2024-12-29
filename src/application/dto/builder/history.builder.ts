import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { HistoryEntity } from '@/application/domain/abstract/history.entity';
import { HistoryAction, UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';

export const HistoryBuilder = <R extends object, T = object>(DTO?: Type<T>) => {
  class HistoryExecutorDTO {
    @ApiResponseProperty({ type: String })
    id: string;

    @ApiResponseProperty({ type: String, enum: UserType })
    type: UserType;

    @ApiResponseProperty({ type: String, format: 'email' })
    email: string;

    @ApiResponseProperty({ type: String })
    name: string;

    constructor(executor: User) {
      this.id = executor.id;
      this.type = executor.type;
      this.email = executor.email;
      this.name = executor.name;
    }
  }

  class HistoryDTO {
    @ApiResponseProperty({ type: String })
    id: string;

    @ApiResponseProperty({ type: String, enum: HistoryAction })
    action: HistoryAction;

    @ApiResponseProperty({ type: DTO ?? Object })
    before: T | object | null;

    @ApiResponseProperty({ type: DTO ?? Object })
    after: T | object | null;

    @ApiResponseProperty({ type: () => HistoryExecutorDTO })
    executor: HistoryExecutorDTO;

    @ApiResponseProperty({ type: Date })
    createdAt: Date;

    constructor(history: HistoryEntity<R>) {
      this.id = history.id;
      this.action = history.action;
      this.before = history.before ? (DTO ? new DTO(history.before) : history.before) : null;
      this.after = history.after ? (DTO ? new DTO(history.after) : history.after) : null;
      this.executor = history.executor ? new HistoryExecutorDTO(history.executor) : null;
      this.createdAt = history.createdAt;
    }
  }

  return HistoryDTO;
};

export const HistoryListBuilder = <R extends HistoryEntity<any>, T = object>(DTO?: Type<T>) => {
  class HistoryDTO extends HistoryBuilder<R, T>(DTO) {}
  class HistoryListDTO {
    @ApiResponseProperty({ type: String })
    targetId: string;

    @ApiResponseProperty({ type: [HistoryDTO] })
    rows: HistoryDTO[];

    constructor(targetId: string, histories: R[]) {
      this.targetId = targetId;
      this.rows = histories.map((history) => new HistoryDTO(history));
    }
  }

  return HistoryListDTO;
};
