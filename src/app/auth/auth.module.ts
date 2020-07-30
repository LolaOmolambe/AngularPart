import { NgModule } from '@angular/core';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})

export class AuthModule {



}
