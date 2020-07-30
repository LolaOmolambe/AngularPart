import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth/auth.service';
import {UserData} from '../user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserData[] = [];

  isLoading = false;
  totalUsers = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.usersService.getUsers(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.usersSub =
    this.usersService.getUserUpdateListener()
    .subscribe((userData: {users: UserData[]; userCount: number}) => {
      this.isLoading = false;
      this.users = userData.users;
      this.totalUsers = userData.userCount;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.usersService.getUsers(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
