// import { Service } from '@angular/core';

// @Service()
// export class SalesApi {}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SalesChartData {
  labels: string[];
  data: number[];
}

@Injectable({
  providedIn: 'root'
})
export class SalesApi {

  getSales(
    period: '6months' | 'month' | 'week'
  ): Observable<SalesChartData> {

    if (period === '6months') {

      return of({
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        data: [
          18500,
          21000,
          19800,
          23500,
          25200,
          31000
        ]
      });

    }

    if (period === 'month') {

      return of({
        labels: [
          'Sep 1',
          'Sep 5',
          'Sep 10',
          'Sep 15',
          'Sep 20',
          'Sep 25',
          'Sep 30'
        ],
        data: [
          4200,
          5800,
          4900,
          7200,
          6500,
          8100,
          9300
        ]
      });

    }

    return of({
      labels: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ],
      data: [
        1200,
        1800,
        1500,
        2200,
        1950,
        2600,
        3100
      ]
    });
  }
}