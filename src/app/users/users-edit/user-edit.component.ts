import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth/auth.service';
import { UserData } from '../user.model';


@Component({
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  private authStatusSub: Subscription;
  private userId: string;
  isLoading = false;
  form: FormGroup;
  user: UserData;

  constructor(
    public userService: UsersService,
    private authService: AuthService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("editpage");
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log("param")
      if(paramMap.has("userId")) {
        //this.mode = "edit"
        this.userId = paramMap.get("userId");
        this.isLoading = true;
        this.userService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.user = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          };
          this.form.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName
          });
        });
      }
    })
  }

  onSaveUser() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.updateUser(
      this.userId,
      this.form.value.firstName,
      this.form.value.lastName
    );
    this.form.reset()
  }
}
