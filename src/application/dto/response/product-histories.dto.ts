import { HistoryListBuilder } from '../builder/history.builder';

import { ProductHistory } from '@/application/domain/entity/product-history.entity';

export class ProductHistoriesDTO extends HistoryListBuilder<ProductHistory>() {}
