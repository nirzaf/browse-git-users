import { Component, Input} from '@angular/core';
import { UserObject } from '../view-users/view-users.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input()user!:UserObject;
}
