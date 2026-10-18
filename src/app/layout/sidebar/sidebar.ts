import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { toSignal } from '@angular/core/rxjs-interop';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
  permission: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private auth = inject(Auth);

  isSidebarCollapsed = false;

  readonly sidebarItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'bi-speedometer2',
      permission: 'Dashboard.View',
    },
    {
      label: 'Users',
      route: '/users',
      icon: 'bi-people',
      permission: 'Users.View',
    },
    {
      label: 'Products',
      route: '/products',
      icon: 'bi-box-seam',
      permission: 'Products.View',
    },
    {
      label: 'Categories',
      route: '/categories',
      icon: 'bi-tags',
      permission: 'Categories.View',
    },
    {
      label: 'Suppliers',
      route: '/suppliers',
      icon: 'bi-truck',
      permission: 'Suppliers.View',
    },
    {
      label: 'Inventory',
      route: '/inventory',
      icon: 'bi-clipboard-data',
      permission: 'Inventory.View',
    },
    {
      label: 'Orders',
      route: '/orders',
      icon: 'bi-cart3',
      permission: 'Orders.View',
    },
    {
      label: 'Reports',
      route: '/reports',
      icon: 'bi-bar-chart-line',
      permission: 'Reports.View',
    },
  ];

  
private currentUser = toSignal(this.auth.currentUser$, {
  initialValue: null,
});

readonly visibleSidebarItems = computed(() => {
  const permissions = this.currentUser()?.permissions ?? [];

  return this.sidebarItems.filter((item) =>
    permissions.includes(item.permission),
  );
});


  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
