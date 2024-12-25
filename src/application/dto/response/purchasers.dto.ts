import { PurchaserDTO } from './purchaser.dto';
import { ListBuilder } from '../builder/list.builder';

import { Purchaser } from '@/application/domain/entity/purchaser.entity';

export class PurchasersDTO extends ListBuilder<Purchaser, PurchaserDTO>(PurchaserDTO) {}
