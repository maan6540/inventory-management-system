import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { UnderDevelopment } from './features/under-development/under-development';
import { Login } from './features/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { permissionGuard } from './core/guards/permission-guard';
import { Unauthorized } from './features/unauthorized/unauthorized';
import { defaultRouteGuard } from './core/guards/default-route-guard';
export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        component: Unauthorized,
        canActivate: [defaultRouteGuard],
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [permissionGuard],
        data: { permission: 'Dashboard.View' },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/under-development/under-development').then((u) => u.UnderDevelopment),
        canActivate: [permissionGuard],
        data: { permission: 'Categories.View' },
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./features/under-development/under-development').then((u) => u.UnderDevelopment),
        canActivate: [permissionGuard],
        data: { permission: 'Inventory.View' },
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/under-development/under-development').then((u) => u.UnderDevelopment),
        canActivate: [permissionGuard],
        data: { permission: 'Reports.View' },
      },
      {
        path: 'users',
        loadComponent: () => import('./features/user/user').then((c) => c.User),
        canActivate: [permissionGuard],
        data: { permission: 'Users.View' },
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/orders/orders').then((c) => c.Orders),
        canActivate: [permissionGuard],
        data: { permission: 'Orders.View' },
      },
      {
        path: 'suppliers',
        loadComponent: () => import('./features/supplier/supplier').then((c) => c.Supplier),
        canActivate: [permissionGuard],
        data: { permission: 'Suppliers.View' },
      },
      {
        path: 'products',
        loadComponent: () => import('./features/product/product').then((c) => c.Product),
        canActivate: [permissionGuard],
        data: { permission: 'Products.View' },
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile/profile').then((c) => c.Profile),
      },
      {
        path: 'profilesetting',
        loadComponent: () =>
          import('./features/profile/profile-settings/profile-settings').then(
            (c) => c.ProfileSettings,
          ),
      },
      {
        path: 'unauthorized',
        component: Unauthorized,
      },
      {
        path: '**',
        component: Unauthorized,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
