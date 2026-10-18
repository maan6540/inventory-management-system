import { Component } from '@angular/core';
import { ordersdata } from './ordersdata';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-recent-orders',
  styleUrl: './recent-orders.scss',
  templateUrl: './recent-orders.html',
})
export class RecentOrders {
  orders = ordersdata.slice(0, 4);

  getStatusBadge(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-success';

      case 'Pending':
        return 'bg-warning text-dark';

      case 'Processing':
        return 'bg-info text-dark';

      case 'Cancelled':
        return 'bg-danger';

      default:
        return 'bg-secondary';
    }
  }
}
