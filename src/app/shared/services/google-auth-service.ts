import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private accessToken = '';
  private clientId = environment.googleClientId;

  login() {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'https://www.googleapis.com/auth/calendar.events',
      callback: (response: any) => {
        this.accessToken = response.access_token;
        if (!environment.production) {
          console.log('Google Auth Service: Access Token: ' + this.accessToken);
        }
      },
    });

    client.requestAccessToken();
  }

  getAccessToken() {
    return this.accessToken;
  }
}
