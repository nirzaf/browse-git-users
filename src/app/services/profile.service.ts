import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UserObject } from "../view-users/view-users.component";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getGitUsersProfile(since:number,perPage:number){
     return this.http.get<UserObject[]>(this.apiUrl + '?since=' + since + '&per_page=' + perPage)
       .pipe(map(data=>{
         const users:UserObject[] = [];
         data.forEach(user => {
           let isOdd = Math.abs(user.id % 2) === 1  //returns true if odd
           if(isOdd){ user.isIdOdd = isOdd; } users.push(user);
         });
         let lastUserId = users[users.length-1].id.toString(); //get the last user id
         localStorage.setItem('lastUserID',lastUserId); //save the last user id
         return users
       }));

  }

  getSince(){
    let since:any = localStorage.getItem('lastUserID'); //get the last user id from local storage
    if(since == null){ since = 0; } //if there is no last user id, set it to 0
    return since;
  }

  reset(){
      localStorage.removeItem('lastUserID'); //remove the last user id from local storage
      //this.loadUserProfile();
  }

}
