import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!localStorage.getItem('auth_token')) {
    return router.createUrlTree(['/login']);
  }

  if (auth.currentUser) {
    return true;
  }

  return auth.getMe().pipe(
    map(() => true),
    catchError(() => {
      auth.expireSession();
      return of(router.createUrlTree(['/login']));
    }),
  );
};
