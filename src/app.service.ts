import { Injectable } from '@nestjs/common';

import { ApplicationConfigFactory } from './common/config/factory/application-config.factory';
import { ApplicationProfileDTO } from './constant/dto/application-profile.dto';

@Injectable()
export class AppService {
  constructor(private readonly applicationConfigFactory: ApplicationConfigFactory) {}

  getApplicationProfile(): ApplicationProfileDTO {
    return new ApplicationProfileDTO(this.applicationConfigFactory);
  }
}
