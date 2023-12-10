import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  userFullName: string = '';
  @Output() add: EventEmitter<string> = new EventEmitter();
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
}
