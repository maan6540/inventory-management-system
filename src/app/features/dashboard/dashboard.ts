import { Component } from '@angular/core';
import { StatCard } from '../../shared/components/stat-card/stat-card';
import { SalesChart } from '../../shared/components/charts/sales-chart/sales-chart';
import { InventoryStatus } from '../../shared/components/inventory-status/inventory-status';
import { RecentOrders } from '../../shared/components/recent-orders/recent-orders';
import { LowStockProducts } from '../../shared/components/low-stock-products/low-stock-products';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatCard,
    SalesChart,
    InventoryStatus,
    RecentOrders,
    LowStockProducts
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  

  statCards = [
    { title: 'Products', value: '1,248', percentage: 8.2, icon: 'bi bi-box-seam' },
    { title: 'Users', value: '186', percentage: 4.5, icon: 'bi bi-people' },
    { title: 'Orders', value: '342', percentage: -12, icon: 'bi bi-cart3' },
    { title: 'Sales', value: '$45,280', percentage: 0, icon: 'bi bi-currency-dollar' }
  ];


}