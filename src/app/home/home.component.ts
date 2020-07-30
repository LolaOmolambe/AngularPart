import { Component, OnInit, OnDestroy } from "@angular/core";
import {AuthService} from '../auth/auth.service';
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated
    });


  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}