import { ApiResponseProperty } from '@nestjs/swagger';

import { NodeEnv } from '@/common/config/enums';
import { ApplicationConfigFactory } from '@/common/config/factory/application-config.factory';

export class ApplicationProfileDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  version: string;

  @ApiResponseProperty({ type: String, enum: NodeEnv })
  nodeEnv: NodeEnv;

  constructor(applicationConfigFactory: ApplicationConfigFactory) {
    this.name = applicationConfigFactory.name;
    this.version = applicationConfigFactory.version;
    this.nodeEnv = applicationConfigFactory.nodeEnv;
  }
}
