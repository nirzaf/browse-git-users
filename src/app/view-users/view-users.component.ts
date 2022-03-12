import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";

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
  isIdOdd?:boolean;
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit, OnDestroy {
displayedColumns: string[] = ['id', 'login', 'html_url' ,'avatar_url'];
dataSource : MatTableDataSource<UserObject>;
private subscription: Subscription = new Subscription();

usersList: UserObject[] = [];
isAutomaticLoadingEnabled:boolean = true;
loadingInterval:number = 0;
perPageUsers:number = 10;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<UserObject>();
  }

public ToggleAutomaticLoading(){
  this.isAutomaticLoadingEnabled = !this.isAutomaticLoadingEnabled;
  this.loadingInterval = this.isAutomaticLoadingEnabled ? 0 : 3000;
}

  ngOnInit(): void {
        // this.dataService.getUsers(10).subscribe(data => {
        //   this.dataSource = new MatTableDataSource<UserObject>(data);
        // });

   this.subscription = this.dataService.getUsersBatch(0,5).subscribe(data => {
     console.log(data);
     for(let user of data){
       let isOdd = Math.abs(user.id % 2) ===1 ? true : false
       if(isOdd){
        user.isIdOdd = isOdd;
       }
     }
      this.dataSource = new MatTableDataSource<UserObject>(data);
      this.loadUserProfile(); //New Implementation
   
    });
    }

    //New Implementation
    public loadUserProfile(){
      let since:any =localStorage.getItem('lastUserID');
      if(since === null){
        since = 0;
      }
      console.log("Since"+since);
    this.dataService.getGitUsersProfile(since,this.perPageUsers).subscribe(data => {
      for(let user of data){
        let isOdd = Math.abs(user.id % 2) ===1 ? true : false
        if(isOdd){
         user.isIdOdd = isOdd;
        }
      }
        this.usersList = data;
      let lastUserId = data[data.length-1].id.toString();
      localStorage.setItem('lastUserID',lastUserId);
      let n = localStorage.getItem('lastUserID');
      console.log(n);
    });
    }

    public loadMore(){
      setTimeout(()=>{
        this.loadUserProfile();
       console.log('LOading More');
      },this.loadingInterval);
    }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
