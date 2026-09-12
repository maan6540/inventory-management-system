import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {

  @Input() data = {
    title: '',
    value: '',
    percentage: 0,
    icon: ''
  };

}