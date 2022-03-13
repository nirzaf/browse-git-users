import {Component, OnDestroy, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import {interval, Subscription} from 'rxjs';


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

export class ViewUsersComponent implements OnInit,OnDestroy {
usersList: UserObject[] = [];
isAutomaticLoadingEnabled:boolean = false; // to enable/disable automatic loading of data
perPageUsers:number = 5;  //5 users per page
automaticLoader: Subscription = new Subscription();  // variable to hold the setInterval function
period = interval(30000); // Auto loading interval

constructor(private dataService: DataService) {}

public toggleAutomaticLoading(){
  this.isAutomaticLoadingEnabled = !this.isAutomaticLoadingEnabled;
  this.determineAutomaticLoading();
}

  ngOnInit(): void {
     this.loadUserProfile();
     this.determineAutomaticLoading();
    }

    public loadUserProfile(){
      let since:any = localStorage.getItem('lastUserID'); //get the last user id from local storage
      if(since == null){ since = 0; } //if there is no last user id, set it to 0

     this.dataService.getGitUsersProfile(since,this.perPageUsers).subscribe(users=>{
      this.usersList = users;
     })


    // this.dataService.getGitUsersProfile(since,this.perPageUsers).subscribe(data => {
    //   data.forEach(user => {
    //     let isOdd = Math.abs(user.id % 2) === 1  //returns true if odd
    //     if(isOdd){ user.isIdOdd = isOdd; } this.usersList.push(user);
    //   });
    //
    //   this.usersList = data;
    //     let lastUserId = data[data.length-1].id.toString(); //get the last user id
    //     localStorage.setItem('lastUserID',lastUserId); //save the last user id
    // });
  }

  public determineAutomaticLoading(){
    if(this.isAutomaticLoadingEnabled){
      this.automaticLoader = this.period.subscribe(()=>{
        this.loadUserProfile();
      });
    }else{
      this.automaticLoader.unsubscribe();
    }
  }
  public loadMore(){
      if(this.isAutomaticLoadingEnabled){
        this.automaticLoader.unsubscribe();
        this.loadUserProfile();
        this.determineAutomaticLoading();
      }else{
        this.loadUserProfile();
        this.determineAutomaticLoading();
      }
    }

  reset() {
    localStorage.removeItem('lastUserID'); //remove the last user id from local storage
    this.loadUserProfile();
  }
  ngOnDestroy(): void {
    this.automaticLoader.unsubscribe();
  }
}
