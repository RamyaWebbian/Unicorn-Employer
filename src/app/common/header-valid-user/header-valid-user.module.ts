import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HeaderValidUserComponent } from './header-valid-user.component';
import { UserService, MemoryStorage } from '../../services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'',component:HeaderValidUserComponent, pathMatch:'full'}
    ])
  ],
  exports:[HeaderValidUserComponent],
  declarations: [HeaderValidUserComponent],
  providers:[UserService, MemoryStorage]
})
export class HeaderValidUserModule { }
