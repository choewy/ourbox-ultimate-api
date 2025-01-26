import { Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs';

@Injectable()
export class ExcelService {
  public readonly excelJS = exceljs;

  fixelToWidth(fixel: number) {
    return Math.ceil(fixel / 7);
  }
}
