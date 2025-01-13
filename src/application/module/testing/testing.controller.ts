import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TestingService } from './testing.service';

@ApiTags('테스트')
@Controller('testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Post('data')
  @ApiOperation({ summary: '테스트 데이터 생성' })
  async createData() {
    return this.testingService.createData();
  }
}
