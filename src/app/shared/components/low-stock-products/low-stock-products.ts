import { Component } from '@angular/core';
import { iconMap, lowStockProducts as lowstockproductlist } from './lowstockproductsdata';

@Component({
  imports: [],
  selector: 'app-low-stock-products',
  styleUrl: './low-stock-products.scss',
  templateUrl: './low-stock-products.html',
})
export class LowStockProducts {
  lowStockProducts = lowstockproductlist;
  iconMap = iconMap;

  getBadgeClass(quantity: number): string {
    if (quantity <= 3) {
      return 'bg-danger';
    }

    if (quantity <= 5) {
      return 'bg-warning text-dark';
    }

    return 'bg-secondary';
  }
  getIcon(categoryName: string): string {
    return this.iconMap[categoryName] ?? 'bi-box';
  }

  get lowestStockProducts() {
    return [...this.lowStockProducts].sort((a, b) => a.quantity - b.quantity).slice(0, 3);
  }
}
