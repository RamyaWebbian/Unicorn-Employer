import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
// import {ShowHideInput} from '../../common/directives/show-hide-directive';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService, MemoryStorage } from '../../services/index';
import { AuthGuard } from '../guards/index';


@NgModule({
  imports: [
    CommonModule,
  // BrowserModule,
    FormsModule,
    LoginRoutingModule,
     ReactiveFormsModule,
  SharedModule
  ],
  declarations: [LoginComponent],
 providers:[AuthGuard, MemoryStorage]
})
export class LoginModule { }
