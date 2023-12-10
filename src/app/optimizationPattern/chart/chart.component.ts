import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
} from '@angular/core';
import * as ChartJs from 'chart.js/auto';
import { List } from 'immutable';
import { User } from '../users.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  chart: any;
  @Input()
  oddUsers!: List<User>;
  @Input()
  evenUsers!: List<User>;
  constructor(private ngZone: NgZone) {}
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.createChart();
    });
  }
  createChart() {
    const data = [
      { users: 'Workers', count: this.oddUsers.size },
      { users: 'Boss', count: this.evenUsers.size },
    ];
    this.chart = new ChartJs.Chart('MyChart', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: 'Entreprise stats',
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }
}
