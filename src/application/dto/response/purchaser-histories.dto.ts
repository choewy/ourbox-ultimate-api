import { HistoryListBuilder } from '../builder/history.builder';

import { PurchaserHistory } from '@/application/domain/entity/purchaser-history.entity';

export class PurchaserHistoriesDTO extends HistoryListBuilder<PurchaserHistory>() {}
