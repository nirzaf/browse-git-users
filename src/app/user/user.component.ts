import { Component, Input} from '@angular/core';
import { UserObject } from '../view-users/view-users.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input()user!:UserObject;
}
