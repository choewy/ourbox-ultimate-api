import { HistoryListBuilder } from '../builder/history.builder';

import { ConsignerHistory } from '@/application/domain/entity/consigner-history.entity';

export class ConsignerHistoriesDTO extends HistoryListBuilder<ConsignerHistory>() {}
