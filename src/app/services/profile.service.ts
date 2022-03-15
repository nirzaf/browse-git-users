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
  private usersPerPage = 5;

  constructor(private http: HttpClient) { }

  getGitUserProfiles(since:number, perPage:number){
     return this.http.get<UserObject[]>(this.apiUrl + '?since=' + since + '&per_page=' + perPage)
       .pipe(map(data=>{
         const users:UserObject[] = [];
         data.forEach(user => { user.isIdOdd = Math.abs(user.id % 2) === 1; users.push(user); });
         this.setStorage('lastUserID',users[users.length-1].id.toString());
         return users;
       }));
  }

  setStorage(key:string, value:string){
    localStorage.setItem(key,value);
  }

  getStorageValue(key:string){
    return localStorage.getItem(key);
  }

  getSince(){
    return this.getStorageValue('lastUserID')  == null? 0: this.getStorageValue('lastUserID') ; //if there is no last user id, set it to 0
  }

  getPagesPerUsers(){
    return this.usersPerPage;
  }

  reset(){
      localStorage.removeItem('lastUserID'); //remove the last user id from local storage
  }
}
