import * as XLSX from 'xlsx';

export interface ParsedWorkbook {
  sheetNames: string[];
  workbook: XLSX.WorkBook;
}
