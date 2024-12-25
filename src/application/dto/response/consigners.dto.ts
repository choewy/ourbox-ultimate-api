import { ConsignerDTO } from './consigner.dto';
import { ListBuilder } from '../builder/list.builder';

import { Consigner } from '@/application/domain/entity/consigner.entity';

export class ConsignersDTO extends ListBuilder<Consigner, ConsignerDTO>(ConsignerDTO) {}
