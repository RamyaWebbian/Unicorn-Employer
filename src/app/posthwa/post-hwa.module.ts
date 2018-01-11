import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostHwaComponent } from './post-hwa.component';
import { PostHwaRoutingModule } from './post-hwa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../services/index';
import {HeaderValidUserModule} from '../common/header-valid-user/header-valid-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostHwaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule,
  ],
  declarations: [PostHwaComponent],
 providers:[]
})

export class PostHwaModule { }
