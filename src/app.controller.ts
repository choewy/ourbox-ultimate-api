import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ApplicationProfileDTO } from './dto/application-profile.dto';

@ApiTags('애플리케이션')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '애플리케이션 정보' })
  @ApiOkResponse({ type: ApplicationProfileDTO })
  getApplicationProfile(): ApplicationProfileDTO {
    return this.appService.getApplicationProfile();
  }
}
