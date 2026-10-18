import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);
  const auth = inject(Auth);
  const router = inject(Router);

  const isLoginRequest = req.url
    .toLowerCase()
    .split('?')[0]
    .endsWith('/auth/login');

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isLoginRequest) {
        return throwError(() => error);
      }

      switch (error.status) {
        case 400:
          notification.error('You are not authorized to perform this task.');
          break;

        case 401:
          if (!req.url.endsWith('/auth/login') && !req.url.endsWith('/auth/me')) {
            notification.error('Your session has expired.');
            auth.expireSession();
            void router.navigate(['/login'], { replaceUrl: true });
          }
          break;

        case 403:
          notification.error('You are not authorized to perform this task.');
          break;

        case 404:
          notification.error('Requested resource was not found.');
          break;

        case 500:
          notification.error('Internal server error.');
          break;

        case 0:
          notification.error('Unable to connect to the server.');
          break;
      }

      return throwError(() => error);
    }),
  );
};
