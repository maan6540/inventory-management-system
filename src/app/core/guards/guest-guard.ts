import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Auth } from '../services/auth';

export const guestGuard: CanActivateFn = () => {
  const token = localStorage.getItem('auth_token');
  const auth = inject(Auth);
  const router = inject(Router);

  if (!token) {
    return true;
  }

  if (auth.currentUser) {
    return router.createUrlTree(['/']);
  }

  return auth.getMe().pipe(
    map(() => router.createUrlTree(['/'])),
    catchError(() => {
      auth.expireSession();
      return of(true);
    }),
  );
};
