import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from "./angular-material.module";

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';

import { PostsModule } from "./posts/posts.module";
import {HeaderComponent} from './header/header.component';
import {AuthModule} from './auth/auth.module';

import {AuthInterceptor} from './auth/auth-interceptor';
import { TaskCreateComponent } from "./tasks/task-create/tasks-create.component";
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from '../error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskCreateComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    PostsModule,
    AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
