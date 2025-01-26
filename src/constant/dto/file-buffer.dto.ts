import { ApiResponseProperty } from '@nestjs/swagger';

import { Mimetype } from '../enums';

export abstract class FileBufferDTO {
  @ApiResponseProperty({ type: String })
  url: string;

  constructor(mimetype: Mimetype, buffer: Buffer) {
    this.url = `data:${mimetype};base64,${buffer.toString('base64')}`;
  }
}
