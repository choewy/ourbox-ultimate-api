import { FulfillmentCenterDTO } from './fulfillment-center.dto';
import { ListBuilder } from '../builder/list.builder';

import { FulfillmentCenter } from '@/application/domain/entity/fulfillment-center.entity';

export class FulfillmentCentersDTO extends ListBuilder<FulfillmentCenter, FulfillmentCenterDTO>(FulfillmentCenterDTO) {}
