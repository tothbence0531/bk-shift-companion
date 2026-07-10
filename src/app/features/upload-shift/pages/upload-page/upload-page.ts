import { Component, signal } from '@angular/core';
import { Shift } from '../../../../shared/models/shift.model';
import { GoogleAuthService } from '../../../../shared/services/google-auth-service';
import { GoogleCalendarService } from '../../../../shared/services/google-calendar-service';

@Component({
  selector: 'app-upload-page',
  imports: [],
  templateUrl: './upload-page.html',
  styleUrl: './upload-page.scss',
})
export class UploadPage {
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
}
