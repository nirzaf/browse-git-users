import { Component, Input, OnInit } from '@angular/core';
import { UserObject } from '../view-users/view-users.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input()user!:UserObject;

  constructor() { }

  ngOnInit(): void {
  }

}
