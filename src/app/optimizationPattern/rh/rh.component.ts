import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UsersService } from '../users.service';
import { List } from 'immutable';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
})
export class RhComponent {
  oddUsers: List<User>;
  evenUsers: List<User>;
  @Output() add: EventEmitter<string> = new EventEmitter();
  constructor(private userService: UsersService) {
    this.oddUsers = List<User>(this.userService.getOddOrEven(true));
    this.evenUsers = List<User>(this.userService.getOddOrEven());
  }

  addUser(list: List<User>, newUser: string) {
    return this.userService.addUser(list, newUser);
  }
}
