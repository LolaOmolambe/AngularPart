import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { UserListComponent } from './users-list/users-list.component';
import {UserEditComponent} from './users-edit/user-edit.component';


@NgModule({
  declarations: [UserListComponent, UserEditComponent],
  imports: [CommonModule, AngularMaterialModule, RouterModule, ReactiveFormsModule],
})
export class UsersModule {}
