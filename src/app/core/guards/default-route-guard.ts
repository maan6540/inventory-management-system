import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

const preferredRoutes = [
  { permission: 'Dashboard.View', route: '/dashboard' },
  { permission: 'Orders.View', route: '/orders' },
  { permission: 'Products.View', route: '/products' },
  { permission: 'Users.View', route: '/users' },
  { permission: 'Categories.View', route: '/categories' },
  { permission: 'Suppliers.View', route: '/suppliers' },
  { permission: 'Inventory.View', route: '/inventory' },
  { permission: 'Reports.View', route: '/reports' },
] as const;

export const defaultRouteGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const permissions = auth.currentUser?.permissions ?? [];
  const accessibleRoute = preferredRoutes.find((item) => permissions.includes(item.permission));

  return accessibleRoute
    ? router.createUrlTree([accessibleRoute.route])
    : router.createUrlTree(['/unauthorized']);
};
