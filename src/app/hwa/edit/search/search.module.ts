import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/index';
import {HeaderValidUserModule} from '../../../common/header-valid-user/header-valid-user.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderValidUserModule
  ],
  declarations: [SearchComponent],
  providers:[]
})
export class SearchModule { }
