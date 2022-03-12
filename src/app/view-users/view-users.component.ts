import {Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface UserObject {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
displayedColumns: string[] = ['id', 'login', 'html_url' ,'avatar_url'];
dataSource : MatTableDataSource<UserObject>;


  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<UserObject>();
  }

  ngOnInit(): void {
        // this.dataService.getUsers(10).subscribe(data => {
        //   this.dataSource = new MatTableDataSource<UserObject>(data);
        // });

    this.dataService.getUsersBatch(0,5).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserObject>(data);
    });
    }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }
}
