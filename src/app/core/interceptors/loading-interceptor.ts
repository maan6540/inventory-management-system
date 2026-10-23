import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader';
import { inject } from '@angular/core';
import { skipGlobalLoader } from './loading-context';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(skipGlobalLoader)) {
    return next(req);
  }

  const loader = inject(LoaderService);
  loader.show();

  return next(req).pipe(finalize(() => loader.hide()));
};
