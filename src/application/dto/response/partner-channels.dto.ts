import { PartnerChannelDTO } from './partner-channel.dto';
import { ListBuilder } from '../builder/list.builder';

import { PartnerChannel } from '@/application/domain/entity/partner-channel.entity';

export class PartnerChannelsDTO extends ListBuilder<PartnerChannel, PartnerChannelDTO>(PartnerChannelDTO) {}
