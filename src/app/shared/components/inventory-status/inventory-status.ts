import { PercentPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [PercentPipe],
  selector: 'app-inventory-status',
  styleUrl: './inventory-status.scss',
  templateUrl: './inventory-status.html',
})
export class InventoryStatus {
  @Input() inventoryStatus = {
    inStockPercentage: 0,
    lowStockPercentage: 0,
    outStockPercentage: 0,
  };
}
