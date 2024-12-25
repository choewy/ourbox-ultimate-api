import { PartnerDTO } from './partner.dto';
import { ListBuilder } from '../builder/list.builder';

import { Partner } from '@/application/domain/entity/partner.entity';

export class PartnersDTO extends ListBuilder<Partner, PartnerDTO>(PartnerDTO) {}
