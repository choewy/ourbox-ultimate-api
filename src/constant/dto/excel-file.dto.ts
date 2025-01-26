import { ApiResponseProperty } from '@nestjs/swagger';

import { Mimetype } from '../enums';
import { FileBufferDTO } from './file-buffer.dto';

export class ExcelFileDTO extends FileBufferDTO {
  @ApiResponseProperty({ type: String })
  filename: string;

  constructor(filename: string, buffer: Buffer) {
    super(Mimetype.Xlsx, buffer);

    this.filename = filename;
  }
}
