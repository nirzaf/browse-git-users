import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { UserObject } from "../view-users/view-users.component";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getGitUsersProfile(since:number,perPage:number){
    //let usersList:UserObject[] = [];
     return this.http.get<UserObject[]>(this.apiUrl + '?since=' + since + '&per_page=' + perPage)
       .pipe(map(data=>{
         const users:UserObject[] = [];
         for(let user of data){
           let isOdd = Math.abs(user.id % 2) === 1
           if(isOdd){
             user.isIdOdd = isOdd;
           }
           users.push(user);
         }
         return users
       }));

  }
}
