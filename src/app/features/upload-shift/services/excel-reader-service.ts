import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ParsedWorkbook } from '../models/parsed-workbook.model';

@Injectable({
  providedIn: 'root',
})
export class ExcelReaderService {
  async readFile(file: File): Promise<ParsedWorkbook> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    return {
      sheetNames: workbook.SheetNames,
      workbook,
    };
  }

  getSheetAsJson<T = any>(workbook: XLSX.WorkBook, sheetName: string): T[] {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`A(z) "${sheetName}" munkalap nem található.`);
    }
    return XLSX.utils.sheet_to_json<T>(sheet, { defval: null });
  }

  getSheetAsArray(workbook: XLSX.WorkBook, sheetName: string): unknown[][] {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`A(z) "${sheetName}" munkalap nem található.`);
    }
    return XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null }) as unknown[][];
  }
}
