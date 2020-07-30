import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  constructor(private http: HttpClient) {}

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

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }
}
