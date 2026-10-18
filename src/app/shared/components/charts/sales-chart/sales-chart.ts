import { Component, inject } from '@angular/core';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables
} from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { SalesApi } from '../../../../core/api/sales-api';

@Component({
  selector: 'app-sales-chart',
  imports: [
    BaseChartDirective,
    FormsModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  templateUrl: './sales-chart.html',
  styleUrl: './sales-chart.scss',
})
export class SalesChart {

  private salesService = inject(SalesApi);

  public lineChartType: 'line' = 'line';

  public selectedPeriod: '6months' | 'month' | 'week' = '6months';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sales',
        tension: 0.4,
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },

    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor() {
    this.loadSalesData();
  }

  public loadSalesData(): void {

    this.salesService
      .getSales(this.selectedPeriod)
      .subscribe({
        next: (response) => {

          this.lineChartData = {
            labels: response.labels,

            datasets: [
              {
                data: response.data,
                label: 'Sales',
                tension: 0.4,
                fill: true
              }
            ]
          };

        },
      });
  }
}