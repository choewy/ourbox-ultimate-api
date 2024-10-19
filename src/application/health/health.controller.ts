import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async healthCheck() {
    return this.healthService.healthCheck();
  }
}
