import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserObject} from "../view-users/view-users.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(numberOfUsers:number){
    return this.http.get<UserObject[]>(this.apiUrl + '?per_page=' + numberOfUsers);
  }

  getUser(username:string){
    return this.http.get(`${this.apiUrl}/${username}`);
  }
}
