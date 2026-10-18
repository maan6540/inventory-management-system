import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { catchError, map, of } from 'rxjs';

export const permissionGuard: CanActivateFn = (route) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const requiredPermission = route.data['permission'];

  if (typeof requiredPermission !== 'string' || requiredPermission.length === 0) {
    return router.createUrlTree(['/unauthorized']);
  }

  const checkPermission = () =>
    auth.currentUser?.permissions?.includes(requiredPermission)
      ? true
      : router.createUrlTree(['/unauthorized']);

  if (auth.currentUser) {
    return checkPermission();
  }

  return auth.getMe().pipe(
    map(() => checkPermission()),
    catchError(() => {
      auth.expireSession();
      return of(router.createUrlTree(['/login']));
    }),
  );
};
