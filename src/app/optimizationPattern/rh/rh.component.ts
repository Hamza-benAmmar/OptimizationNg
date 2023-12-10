import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { User, UsersService } from '../users.service';
import * as ChartJs from 'chart.js/auto';
import { List } from 'immutable';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
})
export class RhComponent implements OnInit {
  oddUsers: List<User>;
  evenUsers: List<User>;
  @Output() add: EventEmitter<string> = new EventEmitter();
  chart: any;
  constructor(private userService: UsersService, private ngZone: NgZone) {
    this.oddUsers = List<User>(this.userService.getOddOrEven(true));
    this.evenUsers = List<User>(this.userService.getOddOrEven());
  }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.createChart();
    });
  }
  addUser(list: List<User>, newUser: string) {
    return this.userService.addUser(list, newUser);
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
