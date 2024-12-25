import { FulfillmentDTO } from './fulfillment.dto';
import { ListBuilder } from '../builder/list.builder';

import { Fulfillment } from '@/application/domain/entity/fulfillment.entity';

export class FulfillmentsDTO extends ListBuilder<Fulfillment, FulfillmentDTO>(FulfillmentDTO) {}
