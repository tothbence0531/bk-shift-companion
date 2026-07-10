import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/upload-shift/pages/upload-page/upload-page').then((m) => m.UploadPage),
  },
];
