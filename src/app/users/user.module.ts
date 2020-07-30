import { NgModule } from '@angular/core';
import { UserListComponent } from './users-list/users-list.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
})
export class UsersModule {}
