import { Component, signal } from '@angular/core';
import { Shift } from '../../../../shared/models/shift.model';
import { GoogleAuthService } from '../../../../shared/services/google-auth-service';
import { GoogleCalendarService } from '../../../../shared/services/google-calendar-service';
import { environment } from '../../../../../environments/environment.development';
import { ExcelReaderService } from '../../services/excel-reader-service';

@Component({
  selector: 'app-upload-page',
  imports: [],
  templateUrl: './upload-page.html',
  styleUrl: './upload-page.scss',
})
export class UploadPage {
  private readonly ALLOWED_EXTENSIONS = ['.xlsx', '.xls'];
  private readonly ALLOWED_MIME_TYPES = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
  ];
  private readonly SHIFT_SHEET_NAME = 'Feltöltendő beosztás';

  shifts = signal<Shift[]>([
    {
      id: '1',
      title: 'Work',
      start: new Date('2026-07-27T08:00:00'),
      end: new Date('2026-07-27T16:00:00'),
    },
    {
      id: '2',
      title: 'Work',
      start: new Date('2026-07-28T16:00:00'),
      end: new Date('2026-07-28T23:00:00'),
    },
    {
      id: '3',
      title: 'Work',
      start: new Date('2026-07-29T08:00:00'),
      end: new Date('2026-07-29T16:00:00'),
    },
    {
      id: '4',
      title: 'Work',
      start: new Date('2026-07-30T16:00:00'),
      end: new Date('2026-07-30T23:00:00'),
    },
  ]);

  constructor(
    private googleAuthService: GoogleAuthService,
    private googleCalendarService: GoogleCalendarService,
    private excelReaderService: ExcelReaderService,
  ) {}

  connectGoogle(): void {
    this.googleAuthService.login();
  }

  addShift(shift: Shift): void {
    this.googleCalendarService.createShift(shift);
  }

  addMultipleShifts(shifts: Shift[]): void {
    shifts.forEach((shift) => this.addShift(shift));
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    if (!environment.production) {
      console.log(`Uploaded file:`);
      console.log(file);
    }

    if (!this.isExcelFile(file)) {
      console.log('File is not a valid excel file');
      return;
    }

    this.readExcelFile(file);
  }

  /**
   * Returns if a file is an excel file, based on the file extension and mime type
   * @param file file to check
   * @returns if a file is an excel file
   */
  private isExcelFile(file: File): boolean {
    const hasValidExtension = this.ALLOWED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    );
    const hasValidMime = this.ALLOWED_MIME_TYPES.includes(file.type);
    return hasValidExtension && hasValidMime;
  }

  private readExcelFile(file: File): void {
    this.excelReaderService.readFile(file).then((workbook) => {
      const sheetNames = workbook.sheetNames;
      if (!environment.production) {
        console.log('Sheet Names:');
        console.log(sheetNames);
      }

      if (!sheetNames.includes(this.SHIFT_SHEET_NAME)) {
        console.error('Sheet name not found');
        return;
      }

      const sheetJson = this.excelReaderService.getSheetAsJson(
        workbook.workbook,
        this.SHIFT_SHEET_NAME,
      );
      if (!environment.production) {
        console.log('Sheet Json:');
        console.log(sheetJson);
      }
      // sheetJson.map((row) => {
      //   console.log(row);
      // });
      console.log(new Date(sheetJson[1]));
    });
  }
}
