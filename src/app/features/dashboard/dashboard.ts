import { Component, inject } from '@angular/core';
import { StatCard } from '../../shared/components/stat-card/stat-card';
import { SalesChart } from '../../shared/components/charts/sales-chart/sales-chart';
import { InventoryStatus } from '../../shared/components/inventory-status/inventory-status';
import { RecentOrders } from '../../shared/components/recent-orders/recent-orders';
import { LowStockProducts } from '../../shared/components/low-stock-products/low-stock-products';
import { Auth } from '../../core/services/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard, SalesChart, InventoryStatus, RecentOrders, LowStockProducts,AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   private auth = inject(Auth);
  currentUser$ = this.auth.currentUser$;
  statCards = [
    { title: 'Products', value: '', percentage: 0, icon: 'bi bi-box-seam' },
    { title: 'Low Stock', value: '', percentage: 0, icon: 'bi bi-exclamation-triangle' },
    { title: 'Pending Orders', value: '', percentage: 0, icon: 'bi bi-cart3' },
    { title: 'Sales', value: '', percentage: 0, icon: 'bi bi-currency-dollar' },
  ];

  statData = [
    { value: '1,248', percentage: 8.2 },
    { value: '186', percentage: 4.5 },
    { value: '342', percentage: -12 },
    { value: '$45,280', percentage: 0 },
  ];

  constructor() {
    this.statCards = this.statCards.map((card, index) => ({
      ...card,
      value: this.statData[index].value,
      percentage: this.statData[index].percentage,
    }));
  }
}
