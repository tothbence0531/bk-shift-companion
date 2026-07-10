import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { environment } from '../../../environments/environment.development';
import { GoogleAuthService } from './google-auth-service';

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  constructor(private googleAuthService: GoogleAuthService) {}

  createShift(shift: Shift): void {
    if (!environment.production) {
      console.log('Google Calendar Service: Create Shift');
      console.log(shift);
    }
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.googleAuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: shift.title,
        start: {
          dateTime: shift.start.toISOString(),
        },
        end: {
          dateTime: shift.end.toISOString(),
        },
      }),
    });
  }
}
