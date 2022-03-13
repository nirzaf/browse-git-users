import {Component, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {ProfileService} from "../services/profile.service";


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

export class ViewUsersComponent implements OnInit {
isAutomaticLoadingEnabled:boolean = false; // to enable/disable automatic loading of data
perPageUsers:number = 5;  //5 users per page
automaticLoader: Subscription = new Subscription();  // variable to hold the setInterval function
period = interval(30000); // Auto loading interval
userStream$: Observable<UserObject[]> = new Observable<UserObject[]>();

constructor(private profileService: ProfileService) {}

public toggleAutomaticLoading(){
  this.isAutomaticLoadingEnabled = !this.isAutomaticLoadingEnabled;
  this.determineAutomaticLoading();
}

  ngOnInit(): void {
     this.loadUserProfile();
     this.determineAutomaticLoading();
    }

  public loadUserProfile(){
    this.userStream$  = this.profileService.getGitUsersProfile(this.profileService.getSince(),this.perPageUsers);
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
  public loadNow(){
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
    this.profileService.reset();
    this.loadUserProfile();
  }
}
