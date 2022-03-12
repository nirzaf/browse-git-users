import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserObject} from "../view-users/view-users.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getGitUsersProfile(since:number,perPage:number){
    return this.http.get<UserObject[]>(this.apiUrl + '?since=' + since + '&per_page=' + perPage);
  }
}
