import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

import { UserData } from './user.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: UserData[] = [];
  private usersUpdated = new Subject<{
    users: UserData[];
    userCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL + '/getallusers' + queryParams
      )
      .pipe(
        map((userData) => {
          return {
            users: userData.users.map((user) => {
              return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user._id
              };
            }),
            maxUsers: userData.maxUsers,
          };
        })
      )
      .subscribe((transformedUserData) => {
        this.users = transformedUserData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUserData.maxUsers,
        });
      });
  }

  getUser(id: string){
    return this.http.get<{_id: string;
    firstName: string; lastName: string; email: string}>(BACKEND_URL + '/getuser/' + id);
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  updateUser(id: string, firstName: string, lastName: string) {
    let userData : UserData | FormData;
    userData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: null,
    };
    this.http.put(BACKEND_URL + '/edituser/' + id, userData)
    .subscribe(response => {
      this.router.navigate(["/userlist"])
    })
  }

  deleteUser(userId: string) {
    return this.http.delete(BACKEND_URL + '/deleteuser/' + userId);
  }

}
